import type { iPhone } from '../types';
import { formatRupiah } from './format';

export function exportToCSV(products: iPhone[]): void {
  const headers = [
    'Nama',
    'Tahun Rilis',
    'Harga (IDR)',
    'Chipset',
    'RAM',
    'Storage',
    'Ukuran Layar',
    'Baterai',
    'Kamera',
  ];

  const rows = products.map((p) => [
    p.name,
    p.releaseYear,
    p.price,
    p.chipset,
    p.ram,
    p.storage.join(' / '),
    p.screenSize,
    p.battery,
    p.camera,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob(['﻿' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `iphone-daftar-harga-indonesia-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportComparisonToPDF(products: iPhone[]): void {
  const win = window.open('', '_blank');
  if (!win) return;

  const cols = products.map((p) => `<th style="padding:12px 16px;text-align:left;background:#0071e3;color:#fff;">${p.name}</th>`).join('');

  const rows: [string, (p: iPhone) => string][] = [
    ['Harga', (p) => formatRupiah(p.price)],
    ['Tahun Rilis', (p) => String(p.releaseYear)],
    ['Chipset', (p) => p.chipset],
    ['RAM', (p) => p.ram],
    ['Storage', (p) => p.storage.join(' / ')],
    ['Ukuran Layar', (p) => p.screenSize],
    ['Baterai', (p) => p.battery],
    ['Kamera', (p) => p.camera],
  ];

  const tableRows = rows
    .map(
      ([label, fn], i) =>
        `<tr style="background:${i % 2 === 0 ? '#f5f5f7' : '#ffffff'}">
          <td style="padding:10px 16px;font-weight:600;color:#1d1d1f;">${label}</td>
          ${products.map((p) => `<td style="padding:10px 16px;color:#1d1d1f;">${fn(p)}</td>`).join('')}
        </tr>`
    )
    .join('');

  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Perbandingan iPhone - Indonesia</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; padding: 40px; color: #1d1d1f; }
    h1 { color: #1d1d1f; margin-bottom: 8px; }
    p { color: #6e6e73; margin-bottom: 32px; }
    table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
    th:first-child { background: #1d1d1f !important; }
    td:first-child { background: #f0f0f5; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>Perbandingan iPhone</h1>
  <p>iPhoneCompare Indonesia — Dicetak pada ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  <table>
    <thead>
      <tr>
        <th style="padding:12px 16px;text-align:left;background:#1d1d1f;color:#fff;">Spesifikasi</th>
        ${cols}
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
</body>
</html>`);
  win.document.close();
  setTimeout(() => win.print(), 500);
}
