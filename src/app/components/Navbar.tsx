import { Link, useLocation } from 'react-router';
import { Moon, Sun, Smartphone, BarChart2, Settings, Info, Search, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useComparison } from '../../context/ComparisonContext';
import { useState, useRef, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from 'react-router';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { compareList } = useComparison();
  const { searchProducts } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-primary'
      : 'text-muted-foreground hover:text-foreground';

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchProducts(query).slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query, searchProducts]);

  const handleSelect = (id: string) => {
    setSearchOpen(false);
    setQuery('');
    setResults([]);
    navigate(`/compare`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-foreground" style={{ fontWeight: 600, fontSize: '15px' }}>
              iPhoneCompare
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm ${isActive('/')}`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:block">Beranda</span>
            </Link>
            <Link
              to="/compare"
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm ${isActive('/compare')}`}
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden md:block">Bandingkan</span>
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full text-[10px] flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm ${isActive('/admin')}`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:block">Admin</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm ${isActive('/about')}`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:block">Tentang</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-10 w-72 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-2">
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Cari iPhone, chipset, tahun..."
                      className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors"
                    />
                  </div>
                  {results.length > 0 && (
                    <div className="border-t border-border">
                      {results.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelect(r.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary text-sm text-left transition-colors"
                        >
                          <img
                            src={r.image}
                            alt={r.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32'; }}
                          />
                          <div>
                            <p className="text-foreground" style={{ fontWeight: 500 }}>{r.name}</p>
                            <p className="text-muted-foreground text-xs">{r.releaseYear} · {r.chipset}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {query && results.length === 0 && (
                    <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
                      Tidak ada hasil untuk "{query}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
