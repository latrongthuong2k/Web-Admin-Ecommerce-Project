export type PropsT = {
  id: number;
  name: string;
};

// order
export type Bill = {
  id: number;
  createdDate: string;
  approvedDate: string;
  createdBy: string;
  approvedBy: string;
  billStatus: string;
};

// Category
export type Category = {
  id: number;
  categoryName: string;
  image: string;
  parentCategory: ParentCategory;
};
export type ParentCategory = {
  id: number;
  categoryName: string;
};

// User

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  role: string;
};
export type CustomTableProps = {
  searchParams?: {
    q?: string;
    page?: number;
    sortField?: string;
    sortDir?: string;
  };
};
export type UserTableProps = {
  searchParams?: {
    q?: string;
    page?: number;
    sortField?: string;
    sortDir?: string;
  };
  targetProps?: string;
};

export type DataState = {
  categories: CategoryT[];
  colors: ColorT[];
  sizes: SizeT[];
  tags: TagT[];
  clientTypes: ClientTypeT[];
  suppliers: SupplierT[];
};
export type CategoryT = {
  id: number;
  categoryName: string;
};
export type ColorT = {
  id: number;
  colorName: string;
};
export type SizeT = {
  id: number;
  sizeValue: string;
};
export type TagT = {
  id: number;
  tagName: string;
};
export type ClientTypeT = {
  id: number;
  typeName: string;
};
export type SupplierT = {
  id: number;
  supplierName: string;
};
// Product
export type Product = {
  productId: number;
  productName: string;
  price: number;
  stockQuantity: number;
  category: number;
  colors: ColorT[];
  sizes: SizeT[];
  tags: TagT[];
  clientTypes: ClientTypeT[];
  supplier: number;
  description: string;
};
