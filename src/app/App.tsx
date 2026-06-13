import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { ThemeProvider } from '../context/ThemeContext';
import { ProductProvider } from '../context/ProductContext';
import { ComparisonProvider } from '../context/ComparisonContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ComparePage } from './pages/ComparePage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <ComparisonProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-background">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  color: 'var(--card-foreground)',
                },
              }}
            />
          </BrowserRouter>
        </ComparisonProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}
