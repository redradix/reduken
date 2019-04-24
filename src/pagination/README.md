# Pagination

## Action creators

```ts
interface PaginationOptions {
    records: any[];
    page: number;
    total?: number;
    perPage?: number;
}

declare const updatePagination: (domain: string, options: PaginationOptions) => object;

declare const resetPagination: (domain: string, options: PaginationOptions) => object;

declare const goNextPage: (domain: string) => object;

declare const goPrevPage: (domain: string) => object;

declare const goToPage: (domain: string, page: number) => object;

declare const appendPage: (domain: string, page: number) => object;
```


## Selectors

> **Note** that all selectors are currified

```ts
declare const getCurrentPage: (domain: string, state: object) => number;

declare const getTotal: (domain: string, state: object) => number;

declare const getPerPage: (domain: string, state: object) => number;

declare const getTotalPages: (domain: string, state: object) => number;

declare const hasPage: (domain: string, pageN: number, state: object) => boolean;

declare const hasNextPage: (domain: string, state: object) => boolean;

declare const hasPrevPage: (domain: string, state: object) => boolean;

declare const getResults: (domain: string, state: object) => any[];
```