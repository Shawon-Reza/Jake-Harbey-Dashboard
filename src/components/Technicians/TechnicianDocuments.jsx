import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Eye, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import axiosApi from '../../Api/axiosInstance';
import { DASHBOARD_TECHNICIAN_DETAILS_QUERY_KEY } from '../../Api/dashboardApi';

const toDisplay = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return value;
};

const makeDownloadName = (value, fallback = 'document') => {
    const cleanedValue = String(value || '').trim().toLowerCase().replace(/\s+/g, '_');
    return cleanedValue || fallback;
};

const TechnicianDocuments = ({ documents = [], contactDocuments = null, technicianInfoDocuments = null, technicianId = null }) => {
    const queryClient = useQueryClient();
    const contactFileInputRefs = useRef({});
    const contactDocs = useMemo(() => {
        const source = contactDocuments ?? documents;
        return Array.isArray(source) ? source : [];
    }, [contactDocuments, documents]);

    const technicianInfoDocs = useMemo(() => {
        return Array.isArray(technicianInfoDocuments) ? technicianInfoDocuments : [];
    }, [technicianInfoDocuments]);

    const tabs = useMemo(() => ([
        {
            key: 'contacts',
            label: 'Contacts',
            count: contactDocs.length,
            items: contactDocs,
        },
        {
            key: 'technician-info',
            label: 'Technician Info',
            count: technicianInfoDocs.length || (technicianId ? 1 : 0),
            items: technicianInfoDocs,
        },
    ]), [contactDocs, technicianInfoDocs, technicianId]);

    const [activeTab, setActiveTab] = useState(tabs[0]?.key || 'contacts');

    useEffect(() => {
        if (!tabs.some((tab) => tab.key === activeTab)) {
            setActiveTab(tabs[0]?.key || 'contacts');
        }
    }, [tabs, activeTab]);

    const activeTabData = tabs.find((tab) => tab.key === activeTab) || tabs[0];
    const visibleDocuments = activeTabData?.items || [];

    const openContactFilePicker = (docId) => {
        contactFileInputRefs.current?.[docId]?.click();
    };

    const handleContactUpload = async (docType, file) => {
        if (!technicianId) {
            toast.error('Missing technician id for this upload.');
            return;
        }

        if (!file) {
            return;
        }

        if (file.type !== 'application/pdf') {
            toast.error('Please select a PDF file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('document_type', docType || 'Contract');
            formData.append('document_file', file);

            await axiosApi.post(`/dashboard/technicians/${technicianId}/upload-document/`, formData);

            toast.success('Document uploaded successfully.');
            await queryClient.invalidateQueries({ queryKey: [...DASHBOARD_TECHNICIAN_DETAILS_QUERY_KEY, technicianId] });
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to upload document.';
            toast.error(message, {
                position: 'top-right',
            });
        }
    };

    const downloadBlobFile = async (fileUrl, fallbackName) => {
        if (!fileUrl || fileUrl === '#') {
            toast.error('File is not available for download.');
            return;
        }

        try {
            const response = await axiosApi.get(fileUrl, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], {
                type: response.headers?.['content-type'] || 'application/octet-stream',
            });

            const fileObjectUrl = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = fileObjectUrl;
            downloadLink.download = fallbackName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            window.URL.revokeObjectURL(fileObjectUrl);
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to download file.';
            toast.error(message, {
                position: 'top-right',
            });
        }
    };

    const handleTechnicianInfoDownload = async () => {
        if (!technicianId) {
            toast.error('Missing technician id for this download.');
            return;
        }

        try {
            const response = await axiosApi.get(`/dashboard/technicians/${technicianId}/export-pdf/`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], {
                type: response.headers?.['content-type'] || 'application/pdf',
            });

            const fileUrl = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = fileUrl;
            downloadLink.download = `technician_profile_${technicianId}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            window.URL.revokeObjectURL(fileUrl);
        } catch (error) {
            const message = error?.response?.data?.message || error?.response?.data?.detail || 'Unable to download technician info.';
            toast.error(message, {
                position: 'top-right',
            });
        }
    };

    return (
        <div className="col-span-2 mb-10 rounded-[24px] border border-[#E7E7E7] bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <FileText className="h-6 w-6 text-[#454545]" />
                <h3 className="text-xl font-bold text-[#2A2A2A]">Documents</h3>
            </div>

            <div className="mb-6 flex flex-wrap gap-3 border-b border-[#E5E7EB] pb-1">
                {tabs.map((tab) => {
                    const isActive = tab.key === activeTab;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative inline-flex items-center gap-2 pb-4 text-sm font-medium transition-colors ${isActive ? 'text-[#0F9DB0]' : 'text-[#667085] hover:text-[#344054]'
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[11px] font-semibold ${isActive ? 'bg-[#EEF8FB] text-[#0F9DB0]' : 'bg-[#F2F4F7] text-[#667085]'
                                }`}>
                                {tab.count}
                            </span>
                            <span className={`absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full transition-all ${isActive ? 'bg-[#0F9DB0]' : 'bg-transparent'}`} />
                        </button>
                    );
                })}
            </div>

            {visibleDocuments.length ? (
                <div className="space-y-4">
                    {visibleDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="group flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFB] p-4 transition-shadow hover:shadow-sm lg:flex-row lg:items-center lg:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#667085] shadow-sm">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="text-[15px] font-semibold text-[#111827]">
                                        {toDisplay(doc.document_type)}
                                    </span>
                                    <p className="text-xs text-[#6B7280]">
                                        Created: {toDisplay(doc.created_at)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                                <button
                                    type="button"
                                    onClick={() => openContactFilePicker(doc.id)}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#0F9DB0] bg-white px-4 py-2.5 text-sm font-semibold text-[#0F9DB0] transition-colors hover:bg-[#F0FBFD]"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Document
                                </button>

                                <input
                                    ref={(element) => {
                                        if (element) {
                                            contactFileInputRefs.current[doc.id] = element;
                                        }
                                    }}
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(event) => {
                                        const selectedFile = event.target.files?.[0];
                                        handleContactUpload(doc.document_type, selectedFile);
                                        event.target.value = '';
                                    }}
                                />

                                <a
                                    href={doc.document_file || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#667085] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
                                    aria-label={`View ${doc.document_type || 'document'}`}
                                >
                                    <Eye className="h-5 w-5" />
                                </a>

                                <a
                                    href={doc.document_file || '#'}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        downloadBlobFile(doc.document_file, `${makeDownloadName(doc.document_type, 'contact_document')}_${doc.id || 'file'}`);
                                    }}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#667085] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
                                    aria-label={`Download ${doc.document_type || 'document'}`}
                                >
                                    <Download className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : activeTab === 'technician-info' ? (
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                    <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 transition-shadow hover:shadow-sm lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#667085] shadow-sm">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-[15px] font-semibold text-[#111827]">
                                    Technician Info PDF
                                </span>
                                <p className="text-xs text-[#6B7280]">
                                    Download the technician profile export.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 lg:justify-end">
                            <button
                                type="button"
                                onClick={handleTechnicianInfoDownload}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#667085] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
                            >
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFAFB] p-8 text-center text-sm text-[#6B7280]">
                    {activeTab === 'contacts' ? 'No contact documents yet.' : 'No technician info documents yet.'}
                </div>
            )}
        </div>
    );
};

export default TechnicianDocuments;