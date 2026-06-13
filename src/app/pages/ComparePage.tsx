import { useState, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useComparison } from '../../context/ComparisonContext';
import { formatRupiah } from '../../utils/format';
import { exportComparisonToPDF } from '../../utils/export';
import { ProductService } from '../../services/ProductService';
import {
  X,
  Plus,
  RotateCcw,
  FileDown,
  Star,
  TrendingDown,
  TrendingUp,
  Minus,
  Check,
} from 'lucide-react';
import type { iPhone } from '../../types';
import { toast } from 'sonner';

export function ComparePage() {
  const { products } = useProducts();
  const { compareList, addToCompare, removeFromCompare, clearComparison, isInComparison } =
    useComparison();
  const [showSelector, setShowSelector] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState('');

  const filteredForSelector = useMemo(() => {
    const q = selectorSearch.toLowerCase();
    return products
      .filter((p) => !isInComparison(p.id))
      .filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.chipset.toLowerCase().includes(q) ||
          String(p.releaseYear).includes(q)
      );
  }, [products, isInComparison, selectorSearch]);

  const minPrice = useMemo(
    () => compareList.length ? Math.min(...compareList.map((p) => p.price)) : 0,
    [compareList]
  );
  const maxPrice = useMemo(
    () => compareList.length ? Math.max(...compareList.map((p) => p.price)) : 0,
    [compareList]
  );
  const priceDiff = maxPrice - minPrice;

  const bestValue = useMemo(() => {
    if (compareList.length < 2) return null;
    return compareList.reduce((best, cur) => {
      const bestScore = parseInt(best.ram) / (best.price / 1_000_000);
      const curScore = parseInt(cur.ram) / (cur.price / 1_000_000);
      return curScore > bestScore ? cur : best;
    });
  }, [compareList]);

  const specRows: { label: string; key: keyof iPhone; render?: (v: unknown) => string }[] = [
    { label: 'Harga', key: 'price', render: (v) => formatRupiah(v as number) },
    { label: 'Tahun Rilis', key: 'releaseYear', render: (v) => String(v) },
    { label: 'Chipset', key: 'chipset' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage', render: (v) => (v as string[]).join(' / ') },
    { label: 'Ukuran Layar', key: 'screenSize' },
    { label: 'Baterai', key: 'battery' },
    { label: 'Kamera', key: 'camera' },
  ];

  const history = ProductService.getComparisonHistory();

  const handleExportPDF = () => {
    if (compareList.length < 2) {
      toast.warning('Pilih minimal 2 iPhone untuk ekspor');
      return;
    }
    exportComparisonToPDF(compareList);
  };

  const handleClear = () => {
    clearComparison();
    toast.info('Perbandingan dihapus');
  };

  const handleAddFromSelector = (phone: iPhone) => {
    const added = addToCompare(phone);
    if (added) {
      toast.success(`${phone.name} ditambahkan`);
    } else {
      toast.warning('Maksimal 4 iPhone');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-foreground" style={{ fontWeight: 700, fontSize: '28px' }}>
              Bandingkan iPhone
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Pilih hingga 4 model untuk dibandingkan ({compareList.length}/4 dipilih)
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {compareList.length >= 2 && (
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
                style={{ fontWeight: 500 }}
              >
                <FileDown className="w-4 h-4" />
                Ekspor PDF
              </button>
            )}
            {compareList.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-xl text-sm hover:bg-destructive/20 transition-colors"
                style={{ fontWeight: 500 }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
            {compareList.length < 4 && (
              <button
                onClick={() => setShowSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
                style={{ fontWeight: 500 }}
              >
                <Plus className="w-4 h-4" />
                Tambah iPhone
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {compareList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-foreground mb-2" style={{ fontWeight: 600, fontSize: '20px' }}>
              Belum ada iPhone yang dipilih
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Tambahkan minimal 2 iPhone untuk mulai membandingkan spesifikasi dan harga.
            </p>
            <button
              onClick={() => setShowSelector(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <Plus className="w-4 h-4" />
              Pilih iPhone
            </button>

            {/* History */}
            {history.length > 0 && (
              <div className="mt-12 w-full max-w-lg">
                <p className="text-muted-foreground text-sm mb-3" style={{ fontWeight: 500 }}>
                  Perbandingan Terakhir
                </p>
                <div className="space-y-2">
                  {history.slice(0, 3).map((h) => {
                    const phones = h.iPhoneIds
                      .map((id) => products.find((p) => p.id === id))
                      .filter(Boolean) as iPhone[];
                    return (
                      <button
                        key={h.id}
                        onClick={() => phones.forEach((p) => addToCompare(p))}
                        className="w-full text-left px-4 py-3 bg-card border border-border rounded-xl hover:border-primary transition-colors text-sm"
                      >
                        <p className="text-foreground" style={{ fontWeight: 500 }}>
                          {phones.map((p) => p.name).join(' vs ')}
                        </p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {new Date(h.timestamp).toLocaleDateString('id-ID')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        {compareList.length > 0 && (
          <div className="space-y-6">
            {/* Insights */}
            {compareList.length >= 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400" style={{ fontWeight: 500 }}>Termurah</p>
                    <p className="text-green-800 dark:text-green-200 text-sm" style={{ fontWeight: 600 }}>
                      {compareList.find((p) => p.price === minPrice)?.name}
                    </p>
                    <p className="text-green-700 dark:text-green-300 text-xs">{formatRupiah(minPrice)}</p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400" style={{ fontWeight: 500 }}>Termahal</p>
                    <p className="text-purple-800 dark:text-purple-200 text-sm" style={{ fontWeight: 600 }}>
                      {compareList.find((p) => p.price === maxPrice)?.name}
                    </p>
                    <p className="text-purple-700 dark:text-purple-300 text-xs">{formatRupiah(maxPrice)}</p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center gap-3">
                  <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400" style={{ fontWeight: 500 }}>Best Value</p>
                    <p className="text-blue-800 dark:text-blue-200 text-sm" style={{ fontWeight: 600 }}>
                      {bestValue?.name}
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-xs">Selisih harga {formatRupiah(priceDiff)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-muted-foreground text-sm w-32" style={{ fontWeight: 500 }}>
                        Spesifikasi
                      </th>
                      {compareList.map((phone) => (
                        <th key={phone.id} className="p-4 text-center min-w-40">
                          <div className="flex flex-col items-center gap-3">
                            <div className="relative">
                              <img
                                src={phone.image}
                                alt={phone.name}
                                className="h-24 w-auto object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    'https://via.placeholder.com/80x120?text=iPhone';
                                }}
                              />
                              <button
                                onClick={() => {
                                  removeFromCompare(phone.id);
                                  toast.info(`${phone.name} dihapus`);
                                }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              {bestValue?.id === phone.id && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ fontWeight: 600 }}>
                                  Best Value
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="text-foreground text-sm" style={{ fontWeight: 600 }}>
                                {phone.name}
                              </p>
                              <p className="text-muted-foreground text-xs">{phone.releaseYear}</p>
                            </div>
                          </div>
                        </th>
                      ))}
                      {compareList.length < 4 && (
                        <th className="p-4">
                          <button
                            onClick={() => setShowSelector(true)}
                            className="flex flex-col items-center gap-2 w-full py-6 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
                          >
                            <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                            <span className="text-xs text-muted-foreground group-hover:text-primary" style={{ fontWeight: 500 }}>
                              Tambah
                            </span>
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr
                        key={row.key}
                        className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-secondary/20' : ''}`}
                      >
                        <td className="p-4 text-muted-foreground text-sm" style={{ fontWeight: 500 }}>
                          {row.label}
                        </td>
                        {compareList.map((phone) => {
                          const val = phone[row.key];
                          const display = row.render ? row.render(val) : String(val);
                          const isCheapest =
                            row.key === 'price' && phone.price === minPrice && compareList.length > 1;
                          const isMostExpensive =
                            row.key === 'price' && phone.price === maxPrice && compareList.length > 1;
                          return (
                            <td
                              key={phone.id}
                              className={`p-4 text-center text-sm ${
                                isCheapest
                                  ? 'text-green-600 dark:text-green-400'
                                  : isMostExpensive
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : 'text-foreground'
                              }`}
                              style={{ fontWeight: isCheapest || isMostExpensive ? 600 : 400 }}
                            >
                              {display}
                              {isCheapest && (
                                <span className="ml-1.5 text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                                  Termurah
                                </span>
                              )}
                            </td>
                          );
                        })}
                        {compareList.length < 4 && <td />}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selector modal */}
      {showSelector && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowSelector(false)}
        >
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-foreground" style={{ fontWeight: 600, fontSize: '17px' }}>
                Pilih iPhone
              </h2>
              <button
                onClick={() => setShowSelector(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 border-b border-border">
              <input
                autoFocus
                value={selectorSearch}
                onChange={(e) => setSelectorSearch(e.target.value)}
                placeholder="Cari iPhone..."
                className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredForSelector.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-8">Tidak ada hasil</p>
              )}
              {filteredForSelector.map((phone) => (
                <button
                  key={phone.id}
                  onClick={() => {
                    handleAddFromSelector(phone);
                    if (compareList.length + 1 >= 4) setShowSelector(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-12 h-16 object-contain shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x64?text=i';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm" style={{ fontWeight: 600 }}>{phone.name}</p>
                    <p className="text-muted-foreground text-xs">{phone.releaseYear} · {phone.chipset}</p>
                    <p className="text-primary text-xs mt-0.5" style={{ fontWeight: 600 }}>{formatRupiah(phone.price)}</p>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
