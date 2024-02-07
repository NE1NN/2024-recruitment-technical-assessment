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

function calculateTotalSize(
  fileId: number,
  fileMap: Map<number, FileData & { children: FileData[] }>
): number {
  const file = fileMap.get(fileId);
  if (!file) {
    return 0;
  }
  return (
    file.size +
    file.children.reduce((acc, child) => {
      return acc + calculateTotalSize(child.id, fileMap);
    }, 0)
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
      const currTotal = calculateTotalSize(file.id, fileMap);
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

// Test 1.2: All files are leaf files
console.assert(
  arraysEqual(
    leafFiles([
      {
        id: 1,
        name: 'OnlyFile.txt',
        categories: ['Only'],
        parent: -1,
        size: 500,
      },
      {
        id: 3,
        name: 'Document.txt',
        categories: ['Document'],
        parent: -1,
        size: 300,
      },
      {
        id: 9,
        name: 'Video.mp4',
        categories: ['Video'],
        parent: -1,
        size: 300,
      },
    ]),
    ['OnlyFile.txt', 'Document.txt', 'Video.mp4']
  ),
  'Test 1.2 Failed'
);

// Test 1.3: Only 1 child
console.assert(
  arraysEqual(
    leafFiles([
      {
        id: 1,
        name: 'OnlyFile.txt',
        categories: ['Only'],
        parent: -1,
        size: 500,
      },
      {
        id: 3,
        name: 'Document.txt',
        categories: ['Document'],
        parent: 1,
        size: 300,
      },
    ]),
    ['Document.txt']
  ),
  'Test 1.3 Failed'
);

// Test 1.4: Empty array
console.assert(leafFiles([]).length === 0, 'Test 1.3 Failed');

// Test 2
console.assert(
  arraysEqual(kLargestCategories(testFiles, 3), [
    'Documents',
    'Folder',
    'Media',
  ])
);

// Test 2.2: All files have equal size
console.assert(
  arraysEqual(
    kLargestCategories(
      [
        {
          id: 1,
          name: 'OnlyFile.txt',
          categories: ['B'],
          parent: -1,
          size: 500,
        },
        {
          id: 2,
          name: 'OnlyFile.txt',
          categories: ['A'],
          parent: -1,
          size: 500,
        },
        {
          id: 3,
          name: 'OnlyFile.txt',
          categories: ['C'],
          parent: -1,
          size: 500,
        },
        {
          id: 4,
          name: 'OnlyFile.txt',
          categories: ['Z'],
          parent: -1,
          size: 500,
        },
      ],
      4
    ),
    ['A', 'B', 'C', 'Z']
  ),

  'Test 2.2 Failed'
);

// Test 2.3: k is greater than the number of unique categories
console.assert(
  arraysEqual(
    kLargestCategories(
      [
        {
          id: 1,
          name: 'OnlyFile.txt',
          categories: ['B'],
          parent: -1,
          size: 500,
        },
        {
          id: 2,
          name: 'OnlyFile.txt',
          categories: ['A'],
          parent: -1,
          size: 500,
        },
        {
          id: 3,
          name: 'OnlyFile.txt',
          categories: ['C'],
          parent: -1,
          size: 500,
        },
        {
          id: 4,
          name: 'OnlyFile.txt',
          categories: ['Z'],
          parent: -1,
          size: 500,
        },
        {
          id: 5,
          name: 'OnlyFile.txt',
          categories: ['Z'],
          parent: -1,
          size: 500,
        },
      ],
      10
    ),
    ['Z', 'A', 'B', 'C']
  ),
  'Test 2.3 Failed'
);

// Test 2.4: k is 0
console.assert(
  arraysEqual(kLargestCategories(testFiles, 0), []),
  'Test 2.4 Failed'
);

// Test 2.5: Array is empty
console.assert(arraysEqual(kLargestCategories([], 10), []), 'Test 2.5 Failed');

// Test 3
console.assert(largestFileSize(testFiles) == 20992);

// Test 3.2: Single file with the largest size
console.assert(
  largestFileSize([
    {
      id: 1,
      name: 'LargeFile.txt',
      categories: ['Large'],
      parent: -1,
      size: 10000,
    },
  ]) === 10000,
  'Test 3.2 Failed'
);
