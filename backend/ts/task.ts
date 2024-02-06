type FileData = {
  id: number;
  name: string;
  categories: string[];
  parent: number;
  size: number;
};

/**
 * Task 1
 */
function leafFiles(files: FileData[]): string[] {
  const filesWithChildren = new Set<number>();
  files.forEach((file) => {
    if (file.parent !== -1) {
      filesWithChildren.add(file.parent);
    }
  });

  const filesWithoutChildren = files.filter(
    (file) => !filesWithChildren.has(file.id)
  );
  return filesWithoutChildren.map((file) => file.name);
}

/**
 * Task 2
 */
function kLargestCategories(files: FileData[], k: number): string[] {
  const categoriesCount = new Map<string, number>();

  // Counts occurrences of each category
  files.forEach((file) => {
    file.categories.forEach((category) => {
      const currCount = categoriesCount.get(category) || 0;
      categoriesCount.set(category, currCount + 1);
    });
  });

  const sortedCategories = Array.from(categoriesCount).sort((a, b) => {
    if (b[1] - a[1] !== 0) {
      return b[1] - a[1];
    } else {
      return a[0].localeCompare(b[0]);
    }
  });

  return sortedCategories.slice(0, k).map((cat) => cat[0]);
}

/**
 * Task 3
 */

type FileDataWithChildren = FileData & {
  children?: FileDataWithChildren[];
};

function calculateTotalSize(file: FileDataWithChildren): number {
  return (
    file.size +
    (file.children?.reduce(
      (acc, child) => acc + calculateTotalSize(child),
      0
    ) || 0)
  );
}

function largestFileSize(files: FileData[]): number {
  const fileMap = new Map<number, FileData & { children: FileData[] }>();

  files.forEach((file) => {
    fileMap.set(file.id, { ...file, children: [] });
  });

  files.forEach((file) => {
    if (file.parent !== -1) {
      fileMap.get(file.parent)?.children.push(file);
    }
  });

  let maxSize = 0;
  fileMap.forEach((file) => {
    if (file.parent === -1) {
      const currTotal = calculateTotalSize(file);
      if (currTotal > maxSize) {
        maxSize = currTotal;
      }
    }
  });

  return maxSize;
}

function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const testFiles: FileData[] = [
  {
    id: 1,
    name: 'Document.txt',
    categories: ['Documents'],
    parent: 3,
    size: 1024,
  },
  {
    id: 2,
    name: 'Image.jpg',
    categories: ['Media', 'Photos'],
    parent: 34,
    size: 2048,
  },
  { id: 3, name: 'Folder', categories: ['Folder'], parent: -1, size: 0 },
  {
    id: 5,
    name: 'Spreadsheet.xlsx',
    categories: ['Documents', 'Excel'],
    parent: 3,
    size: 4096,
  },
  {
    id: 8,
    name: 'Backup.zip',
    categories: ['Backup'],
    parent: 233,
    size: 8192,
  },
  {
    id: 13,
    name: 'Presentation.pptx',
    categories: ['Documents', 'Presentation'],
    parent: 3,
    size: 3072,
  },
  {
    id: 21,
    name: 'Video.mp4',
    categories: ['Media', 'Videos'],
    parent: 34,
    size: 6144,
  },
  { id: 34, name: 'Folder2', categories: ['Folder'], parent: 3, size: 0 },
  {
    id: 55,
    name: 'Code.py',
    categories: ['Programming'],
    parent: -1,
    size: 1536,
  },
  {
    id: 89,
    name: 'Audio.mp3',
    categories: ['Media', 'Audio'],
    parent: 34,
    size: 2560,
  },
  {
    id: 144,
    name: 'Spreadsheet2.xlsx',
    categories: ['Documents', 'Excel'],
    parent: 3,
    size: 2048,
  },
  { id: 233, name: 'Folder3', categories: ['Folder'], parent: -1, size: 4096 },
];

console.assert(
  arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
      'Audio.mp3',
      'Backup.zip',
      'Code.py',
      'Document.txt',
      'Image.jpg',
      'Presentation.pptx',
      'Spreadsheet.xlsx',
      'Spreadsheet2.xlsx',
      'Video.mp4',
    ]
  )
);

console.assert(
  arraysEqual(kLargestCategories(testFiles, 3), [
    'Documents',
    'Folder',
    'Media',
  ])
);

console.assert(largestFileSize(testFiles) == 20992);
console.log(largestFileSize(testFiles));
