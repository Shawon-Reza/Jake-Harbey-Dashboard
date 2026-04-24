import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { getAvatarColor, getInitial } from "./customerUtils";
import { base_URL } from "../../Api/config";
import profile from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";

const CustomersListTable = ({ customers }) => {
    const navigate = useNavigate();
    if (!customers.length) {
        return (
            <div className="bg-white rounded-2xl border border-[#E7E7E7] p-16 text-center text-gray-400">
                N/A
            </div>
        );
    }

    console.log(customers)
    return (
        <div className="bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#E5E7EB]/50 border-b border-[#F0F0F0]">
                        <th className="px-10 py-4 font-medium text-[#6B7280]">Customer</th>
                        <th className="px-10 py-4 font-medium text-[#6B7280]">Contact</th>
                        <th className="px-10 py-4 font-medium text-[#6B7280]">Location</th>
                        <th className="px-10 py-4 font-medium text-[#6B7280]">History</th>
                        <th className="px-10 py-4 font-medium w-20"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                    {customers.map((customer, index) => (
                        <tr
                            key={`${customer.id || customer.user_id || index}`}
                            onClick={() => {
                                navigate(`/customers/${customer.id}`);
                            }}
                            className="group cursor-pointer hover:bg-[#E4F8FB]/30 transition-all duration-300"
                        >
                            <td className="px-10 py-5">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border border-[#E7E7E7] bg-gray-100">
                                        <img
                                            className="block w-full h-full object-cover"
                                            src={customer.profile_picture ? `${base_URL}${customer.profile_picture}` : profile}
                                            alt={customer.full_name || customer.name || customer.customer_name || "Customer"}
                                            onError={(event) => {
                                                event.currentTarget.src = profile;
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg text-[#2A2A2A] mb-1 group-hover:text-[#1A9C9C] transition-colors">
                                            {customer.full_name || customer.name || customer.customer_name || "N/A"}
                                        </p>
                                        <p className="text-gray-400 text-sm tracking-tight">Since {customer.joining_year || customer.since || "N/A"}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-10 py-4">
                                <div className="space-y-3">
                                    <p className="flex items-center gap-3 text-lg text-[#454545]">
                                        <Phone className="w-5 h-5 text-gray-300" /> {customer.phone || "N/A"}
                                    </p>
                                    <p className="flex items-center gap-3 text-base font-medium text-gray-400">
                                        <Mail className="w-5 h-5 text-gray-300" /> {customer.email || "N/A"}
                                    </p>
                                </div>
                            </td>
                            <td className="px-10 py-4">
                                <p className="flex items-center gap-3 text-[#454545]">
                                    <MapPin className="w-6 h-6 text-[#9CA3AF]" /> {customer.location || "N/A"}
                                </p>
                            </td>
                            <td className="px-4 py-4">
                                <p className="text-[#2A2A2A]">
                                    {customer.jobs ?? "N/A"} Job{customer.jobs === 1 ? "" : "s"}
                                </p>
                            </td>
                            <td className="px-4 py-4">
                                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#1A9C9C]/10 transition-colors">
                                    <ChevronRight className="w-8 h-8 text-[#9CA3AF] group-hover:text-[#1A9C9C] transition-all" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersListTable;
