import { useNavigate } from 'react-router';
import { Home, BarChart2 } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div
        className="text-primary/10 select-none mb-6"
        style={{ fontSize: '160px', fontWeight: 900, lineHeight: 1 }}
      >
        404
      </div>
      <h1 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: '32px' }}>
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm" style={{ fontSize: '16px', lineHeight: 1.6 }}>
        Halaman yang Anda cari tidak ada atau telah dipindahkan. Kembali ke beranda atau coba
        halaman lain.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
          style={{ fontWeight: 500 }}
        >
          <Home className="w-4 h-4" />
          Beranda
        </button>
        <button
          onClick={() => navigate('/compare')}
          className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
          style={{ fontWeight: 500 }}
        >
          <BarChart2 className="w-4 h-4" />
          Bandingkan iPhone
        </button>
      </div>
    </div>
  );
}
