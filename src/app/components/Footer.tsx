import { Link } from 'react-router';
import { Smartphone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Smartphone className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-foreground text-sm" style={{ fontWeight: 600 }}>iPhoneCompare Indonesia</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Beranda</Link>
            <Link to="/compare" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Bandingkan</Link>
            <Link to="/admin" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Admin</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Tentang</Link>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} iPhoneCompare Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
