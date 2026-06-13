import { useProducts } from '../../context/ProductContext';
import { formatRupiah } from '../../utils/format';
import { IPhoneCard } from '../components/IPhoneCard';
import { useNavigate } from 'react-router';
import { ProductService } from '../../services/ProductService';
import { BarChart2, TrendingDown, TrendingUp, Cpu, Clock, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import type { iPhone } from '../../types';

export function HomePage() {
  const { products } = useProducts();
  const navigate = useNavigate();

  const recentlyViewedIds = ProductService.getRecentlyViewed();
  const recentlyViewed = useMemo(
    () =>
      recentlyViewedIds
        .map((r) => products.find((p) => p.id === r.iPhoneId))
        .filter((p): p is iPhone => !!p),
    [products, recentlyViewedIds]
  );

  const stats = useMemo(() => {
    if (!products.length) return null;
    const sorted = [...products].sort((a, b) => a.price - b.price);
    const avg = products.reduce((s, p) => s + p.price, 0) / products.length;
    return {
      total: products.length,
      cheapest: sorted[0],
      mostExpensive: sorted[sorted.length - 1],
      averagePrice: avg,
    };
  }, [products]);

  const featured = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.releaseYear - a.releaseYear || b.price - a.price)
        .slice(0, 8),
    [products]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0071e3 0%, #005bb5 50%, #003d7a 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {products.length} Model iPhone Tersedia
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Bandingkan iPhone
            <br />
            <span style={{ color: '#86c8ff' }}>Terbaik di Indonesia</span>
          </h1>
          <p
            className="text-white/80 mb-8 max-w-xl mx-auto"
            style={{ fontSize: '18px', lineHeight: 1.6 }}
          >
            Temukan iPhone yang sempurna dengan membandingkan spesifikasi dan harga secara langsung dalam Rupiah Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/compare')}
              className="px-6 py-3 bg-white text-primary rounded-xl text-sm transition-all hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontWeight: 600 }}
            >
              <span className="flex items-center gap-2 justify-center">
                <BarChart2 className="w-4 h-4" />
                Mulai Bandingkan
              </span>
            </button>
            <button
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/15 text-white rounded-xl text-sm transition-all hover:bg-white/25 backdrop-blur-sm"
              style={{ fontWeight: 600 }}
            >
              Lihat Semua Model
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Stats */}
        {stats && (
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Cpu className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm">Total Model</span>
                </div>
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: '28px' }}>
                  {stats.total}
                </p>
                <p className="text-muted-foreground text-xs mt-1">iPhone Tersedia</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-4.5 h-4.5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-muted-foreground text-sm">Termurah</span>
                </div>
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: '18px', lineHeight: 1.2 }}>
                  {stats.cheapest.name}
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1" style={{ fontWeight: 600 }}>
                  {formatRupiah(stats.cheapest.price)}
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-muted-foreground text-sm">Termahal</span>
                </div>
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: '18px', lineHeight: 1.2 }}>
                  {stats.mostExpensive.name}
                </p>
                <p className="text-purple-600 dark:text-purple-400 text-sm mt-1" style={{ fontWeight: 600 }}>
                  {formatRupiah(stats.mostExpensive.price)}
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-muted-foreground text-sm">Rata-rata Harga</span>
                </div>
                <p className="text-foreground" style={{ fontWeight: 700, fontSize: '18px', lineHeight: 1.2 }}>
                  {formatRupiah(Math.round(stats.averagePrice))}
                </p>
                <p className="text-muted-foreground text-xs mt-1">Per unit</p>
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: '22px' }}>
                  Terakhir Dilihat
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((phone) => (
                <IPhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          </section>
        )}

        {/* Featured */}
        <section id="featured">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: '22px' }}>
              Model iPhone Terbaru
            </h2>
            <button
              onClick={() => navigate('/compare')}
              className="flex items-center gap-1 text-primary text-sm hover:underline"
              style={{ fontWeight: 500 }}
            >
              Bandingkan Semua
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((phone) => (
              <IPhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-foreground mb-2" style={{ fontWeight: 700, fontSize: '24px' }}>
            Siap Membandingkan?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto" style={{ fontSize: '15px' }}>
            Pilih hingga 4 model iPhone dan bandingkan spesifikasi secara berdampingan untuk membuat keputusan terbaik.
          </p>
          <button
            onClick={() => navigate('/compare')}
            className="px-6 py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontWeight: 600 }}
          >
            Mulai Sekarang
          </button>
        </section>
      </div>
    </div>
  );
}
