import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { iPhone } from '../types';
import { ProductService } from '../services/ProductService';

const MAX_COMPARE = 4;

interface ComparisonContextValue {
  compareList: iPhone[];
  addToCompare: (phone: iPhone) => boolean;
  removeFromCompare: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextValue>({
  compareList: [],
  addToCompare: () => false,
  removeFromCompare: () => {},
  clearComparison: () => {},
  isInComparison: () => false,
});

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<iPhone[]>([]);

  const addToCompare = useCallback((phone: iPhone): boolean => {
    let added = false;
    setCompareList((prev) => {
      if (prev.length >= MAX_COMPARE || prev.find((p) => p.id === phone.id)) return prev;
      added = true;
      return [...prev, phone];
    });
    return added;
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearComparison = useCallback(() => {
    if (compareList.length > 0) {
      ProductService.saveComparisonHistory(compareList.map((p) => p.id));
    }
    setCompareList([]);
  }, [compareList]);

  const isInComparison = useCallback(
    (id: string) => compareList.some((p) => p.id === id),
    [compareList]
  );

  return (
    <ComparisonContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearComparison, isInComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  return useContext(ComparisonContext);
}
