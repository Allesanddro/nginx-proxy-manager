import { ReactNode } from "react";

import {
	ButtonGroup,
	Center,
	Flex,
	HStack,
	IconButton,
	Link,
	Select,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import {
	FiChevronsLeft,
	FiChevronLeft,
	FiChevronsRight,
	FiChevronRight,
	FiChevronDown,
	FiChevronUp,
	FiX,
} from "react-icons/fi";

import { TablePagination } from "src/components";
import { intl } from "src/locale";

export interface TableLayoutProps {
	pagination: TablePagination;
	getTableProps: any;
	getTableBodyProps: any;
	headerGroups: any;
	rows: any;
	prepareRow: any;
	gotoPage: any;
	canPreviousPage: any;
	previousPage: any;
	canNextPage: any;
	nextPage: any;
	pageCount: any;
	pageOptions: any;
	visibleColumns: any;
	setAllFilters: any;
	state: any;
}
function TableLayout({
	pagination,
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
	gotoPage,
	canPreviousPage,
	previousPage,
	canNextPage,
	nextPage,
	pageCount,
	pageOptions,
	visibleColumns,
	setAllFilters,
	state,
}: TableLayoutProps) {
	const currentPage = state.pageIndex + 1;
	const getPageList = () => {
		const list = [];
		for (let x = 0; x < pageOptions.length; x++) {
			list.push(
				<option
					key={`table-pagination-page-${x}`}
					value={x + 1}
					selected={currentPage === x + 1}>
					{x + 1}
				</option>,
			);
		}
		return list;
	};

	const renderEmpty = (): ReactNode => {
		return (
			<Tr>
				<Td colSpan={visibleColumns.length}>
					<Center>
						{state?.filters?.length
							? intl.formatMessage(
									{ id: "tables.no-items-with-filters" },
									{ count: state.filters.length },
							  )
							: intl.formatMessage({ id: "tables.no-items" })}
					</Center>
				</Td>
			</Tr>
		);
	};

	return (
		<>
			<Table size="sm" {...getTableProps()}>
				<Thead>
					{headerGroups.map((headerGroup: any, idx: any) => (
						<Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any, idx2: any) => (
								<Th
									key={idx2}
									userSelect="none"
									className={column.className}
									isNumeric={column.isNumeric}>
									<Flex alignItems="center">
										<HStack mx={6} justifyContent="space-between">
											<Text
												{...column.getHeaderProps(
													column.sortable && column.getSortByToggleProps(),
												)}>
												{column.render("Header")}
											</Text>
											{column.sortable && column.isSorted ? (
												column.isSortedDesc ? (
													<FiChevronDown />
												) : (
													<FiChevronUp />
												)
											) : null}
											{column.Filter ? column.render("Filter") : null}
										</HStack>
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{rows.length
						? rows.map((row: any, idx: any) => {
								prepareRow(row);
								return (
									<Tr key={idx} {...row.getRowProps()}>
										{row.cells.map((cell: any, idx2: any) => (
											<Td
												key={idx2}
												{...cell.getCellProps([
													{
														className: cell.column.className,
													},
												])}>
												{cell.render("Cell")}
											</Td>
										))}
									</Tr>
								);
						  })
						: renderEmpty()}
				</Tbody>
			</Table>
			<HStack mx={6} my={4} justifyContent="space-between">
				<VStack align="left">
					<Text color="gray.500">
						{rows.length
							? intl.formatMessage(
									{ id: "tables.pagination-counts" },
									{
										start: pagination.offset + 1,
										end: Math.min(
											pagination.total,
											pagination.offset + pagination.limit,
										),
										total: pagination.total,
									},
							  )
							: null}
					</Text>
					{state?.filters?.length ? (
						<Link onClick={() => setAllFilters([])}>
							<HStack>
								<FiX display="inline-block" />
								<Text>
									{intl.formatMessage(
										{ id: "tables.clear-all-filters" },
										{ count: state.filters.length },
									)}
								</Text>
							</HStack>
						</Link>
					) : null}
				</VStack>
				<nav>
					<ButtonGroup size="sm" isAttached>
						<IconButton
							aria-label={intl.formatMessage({
								id: "tables.pagination-previous",
							})}
							size="sm"
							icon={<FiChevronsLeft />}
							isDisabled={!canPreviousPage}
							onClick={() => gotoPage(0)}
						/>
						<IconButton
							aria-label={intl.formatMessage({
								id: "tables.pagination-previous",
							})}
							size="sm"
							icon={<FiChevronLeft />}
							isDisabled={!canPreviousPage}
							onClick={() => previousPage()}
						/>
						<Select
							size="sm"
							variant="filled"
							borderRadius={0}
							defaultValue={currentPage}
							disabled={!canPreviousPage && !canNextPage}
							aria-label={intl.formatMessage({
								id: "tables.pagination-select",
							})}
							onChange={(e: any) => {
								const page = parseInt(e.target.value, 10) - 1;
								gotoPage(page);
							}}>
							{getPageList()}
						</Select>
						<IconButton
							aria-label={intl.formatMessage({
								id: "tables.pagination-next",
							})}
							size="sm"
							icon={<FiChevronRight />}
							isDisabled={!canNextPage}
							onClick={() => nextPage()}
						/>
						<IconButton
							aria-label={intl.formatMessage({
								id: "tables.pagination-next",
							})}
							size="sm"
							icon={<FiChevronsRight />}
							isDisabled={!canNextPage}
							onClick={() => gotoPage(pageCount - 1)}
						/>
					</ButtonGroup>
				</nav>
			</HStack>
		</>
	);
}

export { TableLayout };
