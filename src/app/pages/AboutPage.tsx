import { Smartphone, BarChart2, Settings, Globe, Shield, Zap, Database, Moon } from 'lucide-react';
import { useNavigate } from 'react-router';

export function AboutPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart2,
      title: 'Perbandingan Spesifikasi',
      desc: 'Bandingkan hingga 4 model iPhone secara berdampingan dengan tabel spesifikasi lengkap.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Globe,
      title: 'Harga Rupiah Indonesia',
      desc: 'Semua harga ditampilkan dalam format Rupiah Indonesia (IDR) yang mudah dipahami.',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Database,
      title: 'Data Lokal (localStorage)',
      desc: 'Semua data tersimpan di browser Anda. Tidak ada server, tidak ada login, tetap privat.',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Settings,
      title: 'Panel Admin',
      desc: 'Tambah, edit, dan hapus data iPhone dengan mudah melalui panel administrasi.',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Moon,
      title: 'Mode Gelap & Terang',
      desc: 'Pilih tema yang nyaman untuk Anda — mode gelap atau terang, tersimpan otomatis.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
    {
      icon: Zap,
      title: 'Ekspor Data',
      desc: 'Ekspor hasil perbandingan ke PDF atau unduh daftar produk dalam format CSV.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: Shield,
      title: 'Privat & Aman',
      desc: 'Tidak ada data yang dikirim ke server. Semua berjalan 100% di browser Anda.',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      icon: Smartphone,
      title: 'Responsif di Semua Perangkat',
      desc: 'Tampil sempurna di ponsel, tablet, maupun komputer desktop Anda.',
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-100 dark:bg-teal-900/30',
    },
  ];

  const techStack = [
    { name: 'React 18', desc: 'UI Framework' },
    { name: 'TypeScript', desc: 'Type Safety' },
    { name: 'Vite', desc: 'Build Tool' },
    { name: 'Tailwind CSS v4', desc: 'Styling' },
    { name: 'React Router v7', desc: 'Navigation' },
    { name: 'localStorage', desc: 'Persistence' },
    { name: 'Sonner', desc: 'Notifications' },
    { name: 'Lucide React', desc: 'Icons' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b border-border py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: '36px' }}>
            iPhoneCompare Indonesia
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: '17px', lineHeight: 1.6 }}>
            Platform perbandingan iPhone terlengkap di Indonesia. Temukan iPhone yang paling
            sesuai dengan kebutuhan dan anggaran Anda.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-foreground mb-4" style={{ fontWeight: 700, fontSize: '28px' }}>
            Misi Kami
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: '16px', lineHeight: 1.8 }}>
            iPhoneCompare Indonesia hadir untuk membantu konsumen Indonesia membuat keputusan
            pembelian iPhone yang lebih cerdas. Dengan informasi spesifikasi yang lengkap dan
            harga dalam Rupiah, kami membantu Anda membandingkan setiap aspek sebelum memutuskan.
          </p>
        </section>

        {/* Features grid */}
        <section>
          <h2 className="text-foreground mb-8 text-center" style={{ fontWeight: 700, fontSize: '28px' }}>
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-5">
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-foreground mb-1.5" style={{ fontWeight: 600, fontSize: '15px' }}>
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm" style={{ lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-foreground mb-6 text-center" style={{ fontWeight: 700, fontSize: '24px' }}>
            Teknologi yang Digunakan
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="text-center p-4 bg-secondary/50 rounded-xl">
                <p className="text-foreground text-sm mb-0.5" style={{ fontWeight: 600 }}>{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data disclaimer */}
        <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
          <h3 className="text-amber-800 dark:text-amber-300 mb-2" style={{ fontWeight: 600, fontSize: '16px' }}>
            ⚠️ Disclaimer
          </h3>
          <p className="text-amber-700 dark:text-amber-400 text-sm" style={{ lineHeight: 1.7 }}>
            Data harga iPhone yang ditampilkan dalam aplikasi ini adalah estimasi harga resmi di
            Indonesia dan dapat berbeda dengan harga aktual di toko. Harga dapat berubah sewaktu-waktu
            berdasarkan kebijakan Apple Indonesia dan kondisi pasar. Selalu periksa harga terbaru
            melalui Apple Store resmi atau retailer terpercaya sebelum melakukan pembelian.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: '26px' }}>
            Siap Menemukan iPhone Ideal Anda?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm" style={{ lineHeight: 1.6 }}>
            Mulai bandingkan spesifikasi dan harga sekarang juga untuk membuat keputusan
            pembelian yang lebih bijak.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-sm hover:bg-secondary/80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              Lihat Semua iPhone
            </button>
            <button
              onClick={() => navigate('/compare')}
              className="px-6 py-3 bg-primary text-white rounded-xl text-sm hover:bg-primary/90 transition-colors hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontWeight: 500 }}
            >
              Mulai Bandingkan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
