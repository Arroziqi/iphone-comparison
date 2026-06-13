import { Plus, Check, Eye } from 'lucide-react';
import type { iPhone } from '../../types';
import { formatRupiah } from '../../utils/format';
import { useComparison } from '../../context/ComparisonContext';
import { useNavigate } from 'react-router';
import { ProductService } from '../../services/ProductService';
import { toast } from 'sonner';

interface Props {
  phone: iPhone;
  showCompare?: boolean;
}

export function IPhoneCard({ phone, showCompare = true }: Props) {
  const { addToCompare, removeFromCompare, isInComparison } = useComparison();
  const navigate = useNavigate();
  const inComparison = isInComparison(phone.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inComparison) {
      removeFromCompare(phone.id);
      toast.info(`${phone.name} dihapus dari perbandingan`);
    } else {
      const added = addToCompare(phone);
      if (added) {
        toast.success(`${phone.name} ditambahkan ke perbandingan`);
      } else {
        toast.warning('Maksimal 4 iPhone dapat dibandingkan');
      }
    }
  };

  const handleView = () => {
    ProductService.addRecentlyViewed(phone.id);
    navigate('/compare');
  };

  const categoryColor: Record<string, string> = {
    pro: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'pro-max': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    plus: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    standard: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    mini: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };

  const categoryLabel: Record<string, string> = {
    pro: 'Pro',
    'pro-max': 'Pro Max',
    plus: 'Plus',
    standard: 'Standard',
    mini: 'Mini',
  };

  return (
    <div
      className={`bg-card border rounded-2xl p-5 flex flex-col gap-4 cursor-pointer group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
        inComparison ? 'border-primary shadow-md' : 'border-border'
      }`}
      onClick={handleView}
    >
      {/* Image */}
      <div className="relative h-40 flex items-center justify-center bg-secondary/50 rounded-xl overflow-hidden">
        <img
          src={phone.image}
          alt={phone.name}
          className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/200x300?text=iPhone';
          }}
        />
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${categoryColor[phone.category]}`}
          style={{ fontWeight: 500 }}
        >
          {categoryLabel[phone.category]}
        </span>
        {inComparison && (
          <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{phone.releaseYear}</p>
        <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '15px' }}>
          {phone.name}
        </h3>
        <p className="text-muted-foreground text-xs truncate">{phone.chipset}</p>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-primary" style={{ fontWeight: 700, fontSize: '15px' }}>
          {formatRupiah(phone.price)}
        </span>
        {showCompare && (
          <button
            onClick={handleCompare}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
              inComparison
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-white'
            }`}
            style={{ fontWeight: 500 }}
          >
            {inComparison ? (
              <>
                <Check className="w-3 h-3" />
                Dipilih
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                Bandingkan
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
