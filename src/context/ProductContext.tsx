import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { iPhone } from '../types';
import { ProductService } from '../services/ProductService';

interface ProductContextValue {
  products: iPhone[];
  refresh: () => void;
  addProduct: (data: Omit<iPhone, 'id'>) => iPhone;
  updateProduct: (id: string, data: Partial<iPhone>) => iPhone | null;
  deleteProduct: (id: string) => boolean;
  searchProducts: (query: string) => iPhone[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextValue>({
  products: [],
  refresh: () => {},
  addProduct: () => ({ id: '' } as unknown as iPhone),
  updateProduct: () => null,
  deleteProduct: () => false,
  searchProducts: () => [],
  loading: true,
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<iPhone[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setProducts(ProductService.getAll());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addProduct = useCallback((data: Omit<iPhone, 'id'>) => {
    const p = ProductService.create(data);
    setProducts(ProductService.getAll());
    return p;
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<iPhone>) => {
    const p = ProductService.update(id, data);
    setProducts(ProductService.getAll());
    return p;
  }, []);

  const deleteProduct = useCallback((id: string) => {
    const ok = ProductService.delete(id);
    if (ok) setProducts(ProductService.getAll());
    return ok;
  }, []);

  const searchProducts = useCallback((query: string) => {
    return ProductService.search(query);
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, refresh, addProduct, updateProduct, deleteProduct, searchProducts, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
