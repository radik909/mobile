type WithDimensions = {
  width?: number;
  height?: number;
};

export function sortToFitLayout<T extends WithDimensions>(data: T[], numColumns = 3) {
  // Clamp inputs + place bigger items first (reduces fragmentation)
  const items = data.map((d) => ({
    ...d,
    width: Math.max(1, Math.min(numColumns, Math.round(d.width || 1))),
    height: Math.max(1, Math.min(3, Math.round(d.height || 1))),
  }));

  // Sort by area desc, then width desc, height desc (helps packing)
  items.sort((a, b) => {
    const areaDiff = b.width * b.height - a.width * a.height;
    if (areaDiff) return areaDiff;
    if (b.width !== a.width) return b.width - a.width;
    return b.height - a.height;
  });

  // Occupancy matrix: matrix[row][col] = true if filled
  const matrix: boolean[][] = [];
  type Placed = T & { x: number; y: number; span: number; width: number; height: number };
  const placed: Placed[] = [];

  const fitsAt = (row: number, col: number, w: number, h: number) => {
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (col + c >= numColumns) return false;
        if (matrix[row + r]?.[col + c]) return false;
      }
    }
    return true;
  };

  const occupy = (row: number, col: number, w: number, h: number) => {
    for (let r = 0; r < h; r++) {
      if (!matrix[row + r]) matrix[row + r] = [];
      for (let c = 0; c < w; c++) {
        matrix[row + r][col + c] = true;
      }
    }
  };

  // Place each item in the first available cell (top-left first)
  for (const item of items) {
    let row = 0;
    placedLoop: while (true) {
      for (let col = 0; col <= numColumns - item.width; col++) {
        if (fitsAt(row, col, item.width, item.height)) {
          occupy(row, col, item.width, item.height);
          placed.push({ ...item, x: col, y: row, span: item.width });
          break placedLoop;
        }
      }
      row += 1;
    }
  }

  // Sort by row then column for row-major order
  placed.sort((a, b) => a.y - b.y || a.x - b.x);

  return placed;
}
