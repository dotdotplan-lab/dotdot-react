import React, {useCallback, useMemo, useRef, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import ProductImageModal from "./ProductImageModal.jsx";

ModuleRegistry.registerModules([AllCommunityModule]); // Community만 등록

const modules = [AllCommunityModule];

// ---------- 커스텀 Cell Renderer ----------
function ThumbnailRenderer({ value}) {
    if (!value) return <div className="thumb thumb--empty" />
    return <img src={value} alt="" className="thumb" />;
}

function StatusRenderer({ data}) {
    const isSoldOut = data.stockQty === 0;
    const label= isSoldOut ? "품절" : data.status === "HIDDEN" ? "숨김" : "판매중";
    const cls = isSoldOut? "badge badge--danger" : data.status === "HIDDEN" ? "badge badge--muted" : "badge badge--success";
    return <span className={cls}>{label}</span>;
}

function CategoryRenderer({ value}) {
    if (!value) return null;
    return <span className="category-path">{[value.large, value.medium, value.small].filter(Boolean).join(" > ")}</span>;
}

function ActionsRenderer(props) {
    const { data, context } = props;

    return (
        <div className="actions">
            <button onClick={() => context.onViewImages(data)} title="이미지">
                <i className="ti ti-photo" />
            </button>
            <button onClick={() => context.onEdit(data)} title="수정">
                <i className="ti ti-edit" />
            </button>
            <button onClick={() => context.onDelete(data)} title="삭제">
                <i className="ti ti-trash" />
            </button>
        </div>
    );
}

function ProductGrid({ onEdit, onDelete }) {
    const gridRef = useRef(null);
    const [rowData, setRowData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const columnDefs = useMemo(() => [
        { headerCheckboxSelection: true, checkboxSelection: true, width: 44, pinned: "left" },
        { headerName: "No", valueGetter: "node.rowIndex + 1", width: 75 },
        { headerName: "이미지", field: "thumbnailUrl", cellRenderer: ThumbnailRenderer, width: 90, sortable: false },
        { headerName: "상품코드", field: "productCode", width: 110 },
        { headerName: "상품명", field: "productName", minWidth: 160},
        { headerName: "카테고리", field: "category", cellRenderer: CategoryRenderer, width: 220 },
        {
            headerName: "판매가",
            field: "price",
            width: 110,
            type: "rightAligned",
            valueFormatter: (p) => p.value?.toLocaleString() + "원",
        },
        { headerName: "재고", field: "stockQty", width: 80, type: "rightAligned" },
        { headerName: "상태", field: "status", cellRenderer: StatusRenderer, width: 90 },
        { headerName: "등록일", field: "createdAt", width: 120, valueFormatter: (p) => p.value?.slice(0, 10) },
        { headerName: "등록자", field: "createdBy", width: 100 },
        { headerName: "관리", cellRenderer: ActionsRenderer, width: 90, sortable: false, filter: false },
    ],[]);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
    }), []);
    const dummyData = [
        {
            productCode: "P0001",
            productName: "아이폰 16 Pro",
            thumbnailUrl: "https://picsum.photos/60?1",
            category: {
                large: "전자제품",
                medium: "휴대폰",
                small: "스마트폰",
            },
            price: 1590000,
            stockQty: 10,
            status: "SALE",
            createdAt: "2026-07-23T10:30:00",
            createdBy: "admin",
        },
        {
            productCode: "P0002",
            productName: "갤럭시 S26",
            thumbnailUrl: "https://picsum.photos/60?2",
            category: {
                large: "전자제품",
                medium: "휴대폰",
                small: "스마트폰",
            },
            price: 1490000,
            stockQty: 0,
            status: "SALE",
            createdAt: "2026-07-20T09:00:00",
            createdBy: "admin",
        },
        {
            productCode: "P0003",
            productName: "맥북 프로",
            thumbnailUrl: "https://picsum.photos/60?3",
            category: {
                large: "전자제품",
                medium: "노트북",
                small: "Mac",
            },
            price: 3290000,
            stockQty: 5,
            status: "HIDDEN",
            createdAt: "2026-07-18T15:10:00",
            createdBy: "kim",
        },
    ];

/*    const onGridReady = useCallback(async (params) => {
        const res = await fetch("/api/v1/products/list");
        const json = await res.json();
        setRowData(json.data);
    }, []);*/

    const onGridReady = useCallback(() => {
        setRowData(dummyData);
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
            <AgGridReact
                theme="legacy"
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                onGridReady={onGridReady}
                context={{ onEdit, onDelete, onViewImages: setSelectedProduct }}
                pagination={true}
                paginationPageSize={20}
            />
            {selectedProduct && (
                <ProductImageModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </div>
    );
}

export default ProductGrid;