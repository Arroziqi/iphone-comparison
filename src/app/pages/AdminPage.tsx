import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { formatRupiah } from '../../utils/format';
import { exportToCSV } from '../../utils/export';
import type { iPhone } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronUp,
  ChevronDown,
  FileDown,
  X,
  AlertTriangle,
  RefreshCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProductService } from '../../services/ProductService';

type SortField = 'name' | 'releaseYear' | 'price';
type SortDir = 'asc' | 'desc';

const EMPTY_FORM: Omit<iPhone, 'id'> = {
  name: '',
  releaseYear: 2024,
  price: 0,
  chipset: '',
  ram: '',
  storage: [],
  screenSize: '',
  battery: '',
  camera: '',
  image: '',
  description: '',
  category: 'standard',
};

export function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, refresh } = useProducts();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('releaseYear');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [editTarget, setEditTarget] = useState<iPhone | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<iPhone, 'id'>>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<iPhone | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = products;
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.chipset.toLowerCase().includes(q) ||
          String(p.releaseYear).includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const av = sortField === 'price' ? a.price : sortField === 'releaseYear' ? a.releaseYear : a.name;
      const bv = sortField === 'price' ? b.price : sortField === 'releaseYear' ? b.releaseYear : b.name;
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [products, search, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setPage(1);
  }, [search, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-primary" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-primary" />
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama model wajib diisi';
    if (!form.chipset.trim()) e.chipset = 'Chipset wajib diisi';
    if (!form.ram.trim()) e.ram = 'RAM wajib diisi';
    if (form.storage.length === 0) e.storage = 'Storage wajib diisi';
    if (!form.screenSize.trim()) e.screenSize = 'Ukuran layar wajib diisi';
    if (!form.battery.trim()) e.battery = 'Baterai wajib diisi';
    if (!form.camera.trim()) e.camera = 'Kamera wajib diisi';
    if (form.price <= 0) e.price = 'Harga harus lebih dari 0';
    if (form.releaseYear < 2007 || form.releaseYear > 2030)
      e.releaseYear = 'Tahun rilis tidak valid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (phone: iPhone) => {
    setEditTarget(phone);
    const { id, ...rest } = phone;
    setForm(rest);
    setErrors({});
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editTarget) {
      updateProduct(editTarget.id, form);
      toast.success(`${form.name} berhasil diperbarui`);
    } else {
      addProduct(form);
      toast.success(`${form.name} berhasil ditambahkan`);
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success(`${deleteTarget.name} berhasil dihapus`);
    setDeleteTarget(null);
  };

  const handleReset = () => {
    ProductService.resetToSeed();
    refresh();
    setShowResetConfirm(false);
    toast.success('Data berhasil direset ke data awal');
  };

  const setField = <K extends keyof typeof form>(k: K, v: typeof form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };

  const Field = ({
    label,
    error,
    children,
  }: {
    label: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <label className="block text-sm text-foreground mb-1" style={{ fontWeight: 500 }}>
        {label}
      </label>
      {children}
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );

  const inputCls =
    'w-full px-3 py-2 bg-background border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary';
  const errCls = 'border-destructive';
  const okCls = 'border-border';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: '28px' }}>
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Kelola data iPhone — {products.length} model terdaftar
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportToCSV(products)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <FileDown className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <RefreshCcw className="w-4 h-4" />
              Reset Data
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Plus className="w-4 h-4" />
              Tambah iPhone
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari model, chipset, tahun..."
            className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/30">
                <tr>
                  <th className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide" style={{ fontWeight: 600 }}>
                    Model
                  </th>
                  <th
                    onClick={() => toggleSort('releaseYear')}
                    className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide cursor-pointer hover:text-foreground"
                    style={{ fontWeight: 600 }}
                  >
                    <span className="flex items-center gap-1">Tahun <SortIcon field="releaseYear" /></span>
                  </th>
                  <th
                    onClick={() => toggleSort('price')}
                    className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide cursor-pointer"
                    style={{ fontWeight: 600 }}
                  >
                    <span className="flex items-center gap-1">
                      Harga <SortIcon field="price" />
                    </span>
                  </th>
                  <th className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell" style={{ fontWeight: 600 }}>
                    Chipset
                  </th>
                  <th className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell" style={{ fontWeight: 600 }}>
                    RAM
                  </th>
                  <th className="p-4 text-left text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell" style={{ fontWeight: 600 }}>
                    Storage
                  </th>
                  <th className="p-4 text-right text-muted-foreground text-xs uppercase tracking-wide" style={{ fontWeight: 600 }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground text-sm">
                      {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada data'}
                    </td>
                  </tr>
                )}
                {paginated.map((phone, i) => (
                  <tr
                    key={phone.id}
                    className={`border-b border-border last:border-0 hover:bg-secondary/20 transition-colors ${
                      i % 2 === 0 ? '' : 'bg-secondary/10'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="w-8 h-10 object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32x40?text=i';
                          }}
                        />
                        <div>
                          <p className="text-foreground text-sm" style={{ fontWeight: 600 }}>
                            {phone.name}
                          </p>
                          <p className="text-muted-foreground text-xs capitalize">{phone.category.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-foreground text-sm">{phone.releaseYear}</td>
                    <td className="p-4 text-primary text-sm" style={{ fontWeight: 600 }}>
                      {formatRupiah(phone.price)}
                    </td>
                    <td className="p-4 text-foreground text-sm hidden md:table-cell">{phone.chipset}</td>
                    <td className="p-4 text-foreground text-sm hidden lg:table-cell">{phone.ram}</td>
                    <td className="p-4 text-foreground text-sm hidden lg:table-cell">
                      {phone.storage.join(', ')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(phone)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(phone)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border">
              <p className="text-muted-foreground text-sm">
                {filtered.length} hasil · Halaman {page} dari {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => Math.abs(n - page) <= 2 || n === 1 || n === totalPages)
                  .map((n, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== n - 1 && (
                        <span key={`e-${n}`} className="px-1 text-muted-foreground text-sm">…</span>
                      )}
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          page === n
                            ? 'bg-primary text-white'
                            : 'hover:bg-secondary text-foreground'
                        }`}
                      >
                        {n}
                      </button>
                    </>
                  ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl my-4">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: '18px' }}>
                {editTarget ? `Edit ${editTarget.name}` : 'Tambah iPhone Baru'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Model *" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="iPhone 16 Pro"
                    className={`${inputCls} ${errors.name ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Kategori *">
                  <select
                    value={form.category}
                    onChange={(e) => setField('category', e.target.value as iPhone['category'])}
                    className={`${inputCls} border-border`}
                  >
                    <option value="standard">Standard</option>
                    <option value="plus">Plus</option>
                    <option value="pro">Pro</option>
                    <option value="pro-max">Pro Max</option>
                    <option value="mini">Mini</option>
                  </select>
                </Field>
                <Field label="Tahun Rilis *" error={errors.releaseYear}>
                  <input
                    type="number"
                    value={form.releaseYear}
                    onChange={(e) => setField('releaseYear', Number(e.target.value))}
                    className={`${inputCls} ${errors.releaseYear ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Harga (IDR) *" error={errors.price}>
                  <input
                    type="number"
                    value={form.price || ''}
                    onChange={(e) => setField('price', Number(e.target.value))}
                    placeholder="18999000"
                    className={`${inputCls} ${errors.price ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Chipset *" error={errors.chipset}>
                  <input
                    value={form.chipset}
                    onChange={(e) => setField('chipset', e.target.value)}
                    placeholder="Apple A18 Bionic"
                    className={`${inputCls} ${errors.chipset ? errCls : okCls}`}
                  />
                </Field>
                <Field label="RAM *" error={errors.ram}>
                  <input
                    value={form.ram}
                    onChange={(e) => setField('ram', e.target.value)}
                    placeholder="8 GB"
                    className={`${inputCls} ${errors.ram ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Storage (pisahkan dengan koma) *" error={errors.storage}>
                  <input
                    value={form.storage.join(', ')}
                    onChange={(e) =>
                      setField(
                        'storage',
                        e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="128 GB, 256 GB, 512 GB"
                    className={`${inputCls} ${errors.storage ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Ukuran Layar *" error={errors.screenSize}>
                  <input
                    value={form.screenSize}
                    onChange={(e) => setField('screenSize', e.target.value)}
                    placeholder='6.1"'
                    className={`${inputCls} ${errors.screenSize ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Baterai *" error={errors.battery}>
                  <input
                    value={form.battery}
                    onChange={(e) => setField('battery', e.target.value)}
                    placeholder="3561 mAh"
                    className={`${inputCls} ${errors.battery ? errCls : okCls}`}
                  />
                </Field>
                <Field label="Kamera *" error={errors.camera}>
                  <input
                    value={form.camera}
                    onChange={(e) => setField('camera', e.target.value)}
                    placeholder="48 MP Triple"
                    className={`${inputCls} ${errors.camera ? errCls : okCls}`}
                  />
                </Field>
              </div>
              <Field label="URL Gambar">
                <input
                  value={form.image}
                  onChange={(e) => setField('image', e.target.value)}
                  placeholder="https://..."
                  className={`${inputCls} border-border`}
                />
              </Field>
              <Field label="Deskripsi">
                <textarea
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  rows={3}
                  placeholder="Deskripsi singkat iPhone..."
                  className={`${inputCls} border-border resize-none`}
                />
              </Field>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-border">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
                style={{ fontWeight: 500 }}
              >
                {editTarget ? 'Simpan Perubahan' : 'Tambah iPhone'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: '18px' }}>
              Hapus {deleteTarget.name}?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Data ini akan dihapus permanen dan tidak dapat dikembalikan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-destructive text-white rounded-xl text-sm hover:bg-destructive/90 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirm */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCcw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: '18px' }}>
              Reset ke Data Awal?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Semua perubahan akan hilang dan data akan dikembalikan ke 15 model iPhone awal.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-sm hover:bg-orange-600 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
