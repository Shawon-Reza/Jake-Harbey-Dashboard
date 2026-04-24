import { useMemo, useState } from "react";
import {

    useDashboardCustomersQuery,
} from "../../Api/dashboardApi";
import CustomerProfileView from "./CustomerProfileView";
import CustomersListTable from "./CustomersListTable";

export default function Customers() {

    const { data, isLoading, isError } = useDashboardCustomersQuery();

    const customers = useMemo(() => {
        if (Array.isArray(data)) return data;
        return data?.results || data?.data || data?.customers || [];
    }, [data]);

    return (
        <div className="flex-1 overflow-y-auto bg-white p-12">
            <div className="mx-auto">
                <h1 className="text-4xl font-medium text-[#2A2A2A] mb-8">Customers</h1>

                <CustomersListTable
                    customers={customers}
                />
            </div>
        </div>
    );
}
