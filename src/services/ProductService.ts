import type { iPhone, ComparisonHistory, RecentlyViewed } from '../types';

const STORAGE_KEY = 'iphone_comparison_products';
const COMPARISON_HISTORY_KEY = 'iphone_comparison_history';
const RECENTLY_VIEWED_KEY = 'iphone_recently_viewed';

const SEED_DATA: iPhone[] = [
  {
    id: '1',
    name: 'iPhone 11',
    releaseYear: 2019,
    price: 6499000,
    chipset: 'Apple A13 Bionic',
    ram: '4 GB',
    storage: ['64 GB', '128 GB', '256 GB'],
    screenSize: '6.1"',
    battery: '3110 mAh',
    camera: '12 MP Dual',
    image: 'https://cdsassets.apple.com/content/services/pub/image?productid=507808&size=240x240',
    description: 'iPhone 11 hadir dengan chip A13 Bionic tercepat di smartphone, sistem kamera ganda, dan daya tahan baterai sepanjang hari.',
    category: 'standard',
  },
  {
    id: '2',
    name: 'iPhone 12',
    releaseYear: 2020,
    price: 9999000,
    chipset: 'Apple A14 Bionic',
    ram: '4 GB',
    storage: ['64 GB', '128 GB', '256 GB'],
    screenSize: '6.1"',
    battery: '2815 mAh',
    camera: '12 MP Dual',
    image: 'https://macstore.id/wp-content/uploads/2020/12/iphone-12-pro-family-hero-all-866x1024.png',
    description: 'iPhone 12 adalah langkah besar ke depan dengan 5G, desain flat edge elegan, layar Super Retina XDR, dan chip A14 Bionic.',
    category: 'standard',
  },
  {
    id: '3',
    name: 'iPhone 12 Pro',
    releaseYear: 2020,
    price: 14999000,
    chipset: 'Apple A14 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.1"',
    battery: '2815 mAh',
    camera: '12 MP Triple + LiDAR',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-select?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 12 Pro dengan sistem kamera pro Triple, LiDAR Scanner, dan bodi stainless steel premium untuk para profesional.',
    category: 'pro',
  },
  {
    id: '4',
    name: 'iPhone 13',
    releaseYear: 2021,
    price: 11999000,
    chipset: 'Apple A15 Bionic',
    ram: '4 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.1"',
    battery: '3227 mAh',
    camera: '12 MP Dual',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 13 hadir dengan peningkatan baterai signifikan, chip A15 Bionic, dan sistem kamera yang lebih canggih.',
    category: 'standard',
  },
  {
    id: '5',
    name: 'iPhone 13 Pro',
    releaseYear: 2021,
    price: 17999000,
    chipset: 'Apple A15 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB', '1 TB'],
    screenSize: '6.1"',
    battery: '3095 mAh',
    camera: '12 MP Triple + LiDAR',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-graphite-select?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 13 Pro dengan layar ProMotion 120Hz, macro photography, dan kemampuan video ProRes untuk kreator konten.',
    category: 'pro',
  },
  {
    id: '6',
    name: 'iPhone 14',
    releaseYear: 2022,
    price: 13999000,
    chipset: 'Apple A15 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.1"',
    battery: '3279 mAh',
    camera: '12 MP Dual',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-midnight-select-202209?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 14 dengan fitur Emergency SOS via Satellite, Crash Detection, dan kamera depan yang lebih canggih.',
    category: 'standard',
  },
  {
    id: '7',
    name: 'iPhone 14 Pro',
    releaseYear: 2022,
    price: 21999000,
    chipset: 'Apple A16 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB', '1 TB'],
    screenSize: '6.1"',
    battery: '3200 mAh',
    camera: '48 MP Triple + LiDAR',
    image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111846_sp875-sp876-iphone14-pro-promax.png',
    description: 'iPhone 14 Pro memperkenalkan Dynamic Island, layar Always-On, dan kamera utama 48 MP generasi baru.',
    category: 'pro',
  },
  {
    id: '8',
    name: 'iPhone 15',
    releaseYear: 2023,
    price: 16499000,
    chipset: 'Apple A16 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.1"',
    battery: '3349 mAh',
    camera: '48 MP Dual',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-black-select-202309?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 15 kini hadir dengan USB-C, Dynamic Island, dan kamera utama 48 MP untuk hasil foto yang memukau.',
    category: 'standard',
  },
  {
    id: '9',
    name: 'iPhone 15 Plus',
    releaseYear: 2023,
    price: 19499000,
    chipset: 'Apple A16 Bionic',
    ram: '6 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.7"',
    battery: '4383 mAh',
    camera: '48 MP Dual',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-black-select-202309?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 15 Plus menawarkan layar 6.7 inci yang besar dengan baterai tahan lama, cocok untuk produktivitas harian.',
    category: 'plus',
  },
  {
    id: '10',
    name: 'iPhone 15 Pro',
    releaseYear: 2023,
    price: 23999000,
    chipset: 'Apple A17 Pro',
    ram: '8 GB',
    storage: ['128 GB', '256 GB', '512 GB', '1 TB'],
    screenSize: '6.1"',
    battery: '3274 mAh',
    camera: '48 MP Triple + LiDAR',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone_15_pro.png',
    description: 'iPhone 15 Pro dengan bodi titanium, chip A17 Pro, dan tombol Action yang dapat dikustomisasi.',
    category: 'pro',
  },
  {
    id: '11',
    name: 'iPhone 15 Pro Max',
    releaseYear: 2023,
    price: 27999000,
    chipset: 'Apple A17 Pro',
    ram: '8 GB',
    storage: ['256 GB', '512 GB', '1 TB'],
    screenSize: '6.7"',
    battery: '4422 mAh',
    camera: '48 MP Triple + 5x Telesecopic + LiDAR',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-15-pro-max.png',
    description: 'iPhone 15 Pro Max menghadirkan zoom tetraprism 5x eksklusif, layar terbesar, dan performa tertinggi di kelasnya.',
    category: 'pro-max',
  },
  {
    id: '12',
    name: 'iPhone 16',
    releaseYear: 2024,
    price: 18999000,
    chipset: 'Apple A18',
    ram: '8 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.1"',
    battery: '3561 mAh',
    camera: '48 MP Dual',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=940&hei=1112&fmt=png-alpha',
    description: 'iPhone 16 dibangun untuk Apple Intelligence dengan chip A18, tombol Kontrol Kamera baru, dan baterai yang lebih besar.',
    category: 'standard',
  },
  {
    id: '13',
    name: 'iPhone 16 Plus',
    releaseYear: 2024,
    price: 21999000,
    chipset: 'Apple A18',
    ram: '8 GB',
    storage: ['128 GB', '256 GB', '512 GB'],
    screenSize: '6.7"',
    battery: '4674 mAh',
    camera: '48 MP Dual',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png',
    description: 'iPhone 16 Plus menawarkan layar luas 6.7 inci dengan baterai terlama di iPhone mana pun yang pernah ada.',
    category: 'plus',
  },
  {
    id: '14',
    name: 'iPhone 16 Pro',
    releaseYear: 2024,
    price: 26999000,
    chipset: 'Apple A18 Pro',
    ram: '8 GB',
    storage: ['128 GB', '256 GB', '512 GB', '1 TB'],
    screenSize: '6.3"',
    battery: '3582 mAh',
    camera: '48 MP Triple + LiDAR',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png',
    description: 'iPhone 16 Pro dengan chip A18 Pro, kamera 48 MP ultrawide baru, dan dukungan Apple Intelligence penuh.',
    category: 'pro',
  },
  {
    id: '15',
    name: 'iPhone 16 Pro Max',
    releaseYear: 2024,
    price: 31999000,
    chipset: 'Apple A18 Pro',
    ram: '8 GB',
    storage: ['256 GB', '512 GB', '1 TB'],
    screenSize: '6.9"',
    battery: '4685 mAh',
    camera: '48 MP Triple + 5x Telesecopic + LiDAR',
    image: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121032-iphone-16-pro-max.png',
    description: 'iPhone 16 Pro Max adalah yang paling canggih dengan layar 6.9 inci terbesar, baterai terkuat, dan kemampuan AI terdepan.',
    category: 'pro-max',
  },
];

export const ProductService = {
  getAll(): iPhone[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    return JSON.parse(stored) as iPhone[];
  },

  save(products: iPhone[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  create(product: Omit<iPhone, 'id'>): iPhone {
    const products = ProductService.getAll();
    const newProduct: iPhone = {
      ...product,
      id: Date.now().toString(),
    };
    products.push(newProduct);
    ProductService.save(products);
    return newProduct;
  },

  update(id: string, data: Partial<iPhone>): iPhone | null {
    const products = ProductService.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    ProductService.save(products);
    return products[index];
  },

  delete(id: string): boolean {
    const products = ProductService.getAll();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    ProductService.save(filtered);
    return true;
  },

  search(query: string): iPhone[] {
    const q = query.toLowerCase().trim();
    if (!q) return ProductService.getAll();
    return ProductService.getAll().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.chipset.toLowerCase().includes(q) ||
        String(p.releaseYear).includes(q)
    );
  },

  getById(id: string): iPhone | undefined {
    return ProductService.getAll().find((p) => p.id === id);
  },

  resetToSeed(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  },

  // Comparison history
  getComparisonHistory(): ComparisonHistory[] {
    const stored = localStorage.getItem(COMPARISON_HISTORY_KEY);
    return stored ? (JSON.parse(stored) as ComparisonHistory[]) : [];
  },

  saveComparisonHistory(iPhoneIds: string[]): void {
    const history = ProductService.getComparisonHistory();
    const entry: ComparisonHistory = {
      id: Date.now().toString(),
      iPhoneIds,
      timestamp: Date.now(),
    };
    const updated = [entry, ...history].slice(0, 10);
    localStorage.setItem(COMPARISON_HISTORY_KEY, JSON.stringify(updated));
  },

  // Recently viewed
  getRecentlyViewed(): RecentlyViewed[] {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return stored ? (JSON.parse(stored) as RecentlyViewed[]) : [];
  },

  addRecentlyViewed(iPhoneId: string): void {
    const list = ProductService.getRecentlyViewed().filter(
      (r) => r.iPhoneId !== iPhoneId
    );
    const updated = [{ iPhoneId, timestamp: Date.now() }, ...list].slice(0, 6);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  },
};
