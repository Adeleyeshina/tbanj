'use client'
import { Calendar, Clock, MessageCircle, Phone, Inbox } from 'lucide-react'
import { Inquiry, InquiryStatus } from './admin-types'
import { getWhatsAppUrl, getCallUrl } from '@/lib/site-config'
import { cn } from '@/utils/cn'

interface AdminInquiriesTableProps {
    inquiries: Inquiry[]
    onUpdateStatus: (id: string, status: InquiryStatus) => void
}

const AdminInquiriesTable: React.FC<AdminInquiriesTableProps> = ({ inquiries, onUpdateStatus }) => {
    return (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs p-4 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                    <h2 className="font-heading font-extrabold text-lg sm:text-xl text-neutral-900">
                        Customer Inspection Requests &amp; Inquiries
                    </h2>
                    <p className="text-xs text-neutral-500">Direct requests sent via the Contact and Property Booking forms.</p>
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-xl">
                    Total: {inquiries.length}
                </span>
            </div>

            {inquiries.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                    <Inbox className="w-8 h-8 text-neutral-300 mx-auto" />
                    <p className="text-xs text-neutral-500 italic">No inspection inquiries received yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                    <table className="w-full text-left text-xs min-w-[720px]">
                        <thead className="bg-neutral-50 text-neutral-600 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-200">
                            <tr>
                                <th className="p-3.5">Customer</th>
                                <th className="p-3.5">Target Property</th>
                                <th className="p-3.5">Inspection Date / Time</th>
                                <th className="p-3.5">Message / Note</th>
                                <th className="p-3.5">Status</th>
                                <th className="p-3.5 text-right">Quick Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-neutral-800 font-medium">
                            {inquiries.map((inq) => (
                                <tr key={inq.id} className="hover:bg-neutral-50/80 transition-colors">
                                    <td className="p-3.5">
                                        <p className="font-bold text-neutral-900">{inq.userName}</p>
                                        <p className="text-[11px] text-neutral-500">{inq.userPhone}</p>
                                        {inq.userEmail && <p className="text-[10px] text-neutral-400">{inq.userEmail}</p>}
                                    </td>
                                    <td className="p-3.5">
                                        <p className="font-semibold text-neutral-900 line-clamp-1 max-w-[200px]">{inq.propertyTitle}</p>
                                        {inq.propertyPid && (
                                            <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1 py-0.5 rounded">
                                                {inq.propertyPid}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3.5 whitespace-nowrap">
                                        <div className="flex items-center gap-1 font-semibold text-neutral-800">
                                            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                                            <span>{inq.date || 'TBD'}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
                                            <Clock className="w-3 h-3" />
                                            <span>{inq.timeSlot || 'Anytime'}</span>
                                        </div>
                                    </td>
                                    <td className="p-3.5">
                                        <p className="text-neutral-600 line-clamp-2 max-w-[220px] text-[11px]">
                                            {inq.message || 'No special note'}
                                        </p>
                                    </td>
                                    <td className="p-3.5 whitespace-nowrap">
                                        <select
                                            value={inq.status}
                                            onChange={(e) => onUpdateStatus(inq.id, e.target.value as InquiryStatus)}
                                            className={cn(
                                                'px-2 py-1 rounded-lg text-xs font-bold border',
                                                inq.status === 'new' && 'bg-rose-50 text-rose-700 border-rose-300',
                                                inq.status === 'contacted' && 'bg-amber-50 text-amber-700 border-amber-300',
                                                inq.status === 'scheduled' && 'bg-emerald-50 text-emerald-700 border-emerald-300',
                                                (inq.status === 'completed' || inq.status === 'cancelled') && 'bg-neutral-100 text-neutral-700 border-neutral-300'
                                            )}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="scheduled">Scheduled</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-3.5 whitespace-nowrap text-right space-x-1.5">
                                        <a
                                            href={getWhatsAppUrl(inq.userPhone)}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            <span>WhatsApp</span>
                                        </a>
                                        <a
                                            href={getCallUrl(inq.userPhone)}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-900 text-white font-bold text-[11px] hover:bg-neutral-800"
                                        >
                                            <Phone className="w-3.5 h-3.5" />
                                            <span>Call</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminInquiriesTable
