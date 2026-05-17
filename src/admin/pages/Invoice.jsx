import { useState, useRef } from 'react';
import {
  FiFileText, FiDownload, FiPlus, FiTrash2, FiUser, FiCalendar,
} from 'react-icons/fi';
import jsPDF from 'jspdf';

const ACCENT_RGB = [37, 99, 235]; // matches --accent (#2563EB)

const Invoice = () => {
  const invoiceRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [companyInfo] = useState({
    name: 'Tech Waglogy LLP',
    address: 'Tadong Metro Point',
    city: 'Gangtok, Sikkim - 737102',
    phone: '+91 97338 14168',
    email: 'waglogy.in@gmail.com',
    website: 'www.waglogy.in',
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [clientInfo, setClientInfo] = useState({
    name: '', email: '', phone: '', address: '', city: '',
  });

  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 },
  ]);

  const [notes, setNotes] = useState('Thank you for your business!');
  const [paymentDetails] = useState({
    bankName: 'State Bank of India',
    accountNumber: '36819699069',
    ifsc: 'SBIN0008405',
    upi: 'techbhupesh@oksbi',
  });

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const calculateTotal = () => calculateSubtotal();

  const handleItemChange = (id, field, value) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = (updatedItem.quantity || 0) * (updatedItem.rate || 0);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      let yPos = 20;
      const leftMargin = 20;
      const rightMargin = 190;
      const pageWidth = 210;
      const [aR, aG, aB] = ACCENT_RGB;

      // Company Header
      pdf.setFontSize(22);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(companyInfo.name, leftMargin, yPos);

      yPos += 8;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text(companyInfo.address, leftMargin, yPos);
      yPos += 5;
      pdf.text(companyInfo.city, leftMargin, yPos);
      yPos += 5;
      pdf.text(`Phone: ${companyInfo.phone}`, leftMargin, yPos);
      yPos += 5;
      pdf.text(`Email: ${companyInfo.email}`, leftMargin, yPos);
      yPos += 5;
      pdf.text(`Website: ${companyInfo.website}`, leftMargin, yPos);

      // INVOICE label (right)
      pdf.setFontSize(22);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(aR, aG, aB);
      pdf.text('INVOICE', rightMargin, 20, { align: 'right' });

      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(12, 12, 12);
      pdf.text(`Invoice #: ${invoiceData.invoiceNumber}`, rightMargin, 30, { align: 'right' });
      pdf.text(
        `Date: ${new Date(invoiceData.invoiceDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        rightMargin, 35, { align: 'right' },
      );
      pdf.text(
        `Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        rightMargin, 40, { align: 'right' },
      );

      // Separator
      yPos += 10;
      pdf.setDrawColor(229, 226, 220);
      pdf.setLineWidth(0.4);
      pdf.line(leftMargin, yPos, rightMargin, yPos);
      yPos += 10;

      // Bill To
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(110, 107, 103);
      pdf.text('BILL TO', leftMargin, yPos);
      yPos += 7;

      pdf.setFontSize(12);
      pdf.setTextColor(12, 12, 12);
      pdf.text(clientInfo.name || 'Client Name', leftMargin, yPos);
      yPos += 5;

      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      if (clientInfo.email)   { pdf.text(clientInfo.email, leftMargin, yPos);   yPos += 5; }
      if (clientInfo.phone)   { pdf.text(clientInfo.phone, leftMargin, yPos);   yPos += 5; }
      if (clientInfo.address) { pdf.text(clientInfo.address, leftMargin, yPos); yPos += 5; }
      if (clientInfo.city)    { pdf.text(clientInfo.city, leftMargin, yPos);    yPos += 5; }

      yPos += 5;

      // Items Table Header
      pdf.setFillColor(aR, aG, aB);
      pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 8, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(10);
      pdf.text('Description', leftMargin + 2, yPos + 5.5);
      pdf.text('Qty', 120, yPos + 5.5, { align: 'center' });
      pdf.text('Rate', 145, yPos + 5.5, { align: 'right' });
      pdf.text('Amount', rightMargin - 2, yPos + 5.5, { align: 'right' });

      yPos += 8;
      pdf.setTextColor(12, 12, 12);
      pdf.setFont(undefined, 'normal');

      items.forEach((item, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 248);
          pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 7, 'F');
        }
        pdf.setTextColor(61, 58, 54);
        pdf.text(item.description || 'Item description', leftMargin + 2, yPos + 5);
        pdf.text(String(item.quantity), 120, yPos + 5, { align: 'center' });
        pdf.text(formatCurrency(item.rate), 145, yPos + 5, { align: 'right' });
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(12, 12, 12);
        pdf.text(formatCurrency(item.amount), rightMargin - 2, yPos + 5, { align: 'right' });
        pdf.setFont(undefined, 'normal');
        yPos += 7;
      });

      yPos += 5;

      // Totals
      const totalsX = 130;
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text('Subtotal:', totalsX, yPos);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(formatCurrency(calculateSubtotal()), rightMargin - 2, yPos, { align: 'right' });

      yPos += 8;
      pdf.setFillColor(aR, aG, aB);
      pdf.rect(totalsX - 5, yPos - 5, rightMargin - totalsX + 7, 9, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont(undefined, 'bold');
      pdf.setFontSize(11);
      pdf.text('TOTAL', totalsX, yPos + 1);
      pdf.text(formatCurrency(calculateTotal()), rightMargin - 2, yPos + 1, { align: 'right' });

      pdf.setTextColor(12, 12, 12);
      pdf.setFontSize(10);
      yPos += 12;

      // Notes
      if (notes) {
        pdf.setDrawColor(229, 226, 220);
        pdf.setLineWidth(0.2);
        pdf.line(leftMargin, yPos, rightMargin, yPos);
        yPos += 7;

        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(110, 107, 103);
        pdf.text('NOTES', leftMargin, yPos);
        yPos += 5;

        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(61, 58, 54);
        const splitNotes = pdf.splitTextToSize(notes, rightMargin - leftMargin);
        pdf.text(splitNotes, leftMargin, yPos);
        yPos += splitNotes.length * 5 + 5;
      }

      // Payment Details
      pdf.setDrawColor(229, 226, 220);
      pdf.setLineWidth(0.4);
      pdf.line(leftMargin, yPos, rightMargin, yPos);
      yPos += 7;

      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(110, 107, 103);
      pdf.text('PAYMENT DETAILS', leftMargin, yPos);
      yPos += 7;

      pdf.setFontSize(9);
      const col1X = leftMargin;
      const col2X = 110;

      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text('Bank Name:', col1X, yPos);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(paymentDetails.bankName, col1X, yPos + 4);

      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text('Account Number:', col2X, yPos);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(paymentDetails.accountNumber, col2X, yPos + 4);

      yPos += 10;

      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text('IFSC Code:', col1X, yPos);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(paymentDetails.ifsc, col1X, yPos + 4);

      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(110, 107, 103);
      pdf.text('UPI ID:', col2X, yPos);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(12, 12, 12);
      pdf.text(paymentDetails.upi, col2X, yPos + 4);

      yPos += 12;

      // Footer
      pdf.setDrawColor(229, 226, 220);
      pdf.setLineWidth(0.2);
      pdf.line(leftMargin, yPos, rightMargin, yPos);
      yPos += 5;

      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(110, 107, 103);
      pdf.text('This is a computer-generated invoice and does not require a signature.', pageWidth / 2, yPos, { align: 'center' });
      yPos += 5;
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(aR, aG, aB);
      pdf.text('Thank you for your business!', pageWidth / 2, yPos, { align: 'center' });

      pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Finance</span>
          <h1 className="admin-page-title mt-3 flex items-center gap-3">
            <FiFileText className="text-[#2563EB]" /> Invoice Generator
          </h1>
          <p className="admin-page-subtitle">Create and download professional invoices.</p>
        </div>
        <button
          onClick={downloadPDF}
          disabled={loading || !clientInfo.name}
          className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <FiDownload size={16} />
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Form */}
        <div className="lg:col-span-1 space-y-5">
          {/* Invoice Details */}
          <div className="admin-card p-6">
            <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit'] mb-4 flex items-center gap-2">
              <FiCalendar size={16} className="text-[#6E6B67]" />
              Invoice Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Invoice Date</label>
                <input
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Due Date</label>
                <input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="admin-card p-6">
            <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit'] mb-4 flex items-center gap-2">
              <FiUser size={16} className="text-[#6E6B67]" />
              Client Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Client Name *</label>
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="admin-input"
                  placeholder="Company / Person Name"
                  required
                />
              </div>
              <div>
                <label className="admin-label">Email</label>
                <input
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="admin-input"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="admin-label">Phone</label>
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="admin-input"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="admin-label">Address</label>
                <input
                  type="text"
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                  className="admin-input"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="admin-label">City, State - ZIP</label>
                <input
                  type="text"
                  value={clientInfo.city}
                  onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })}
                  className="admin-input"
                  placeholder="City, State - 000000"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="admin-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit']">Invoice Items</h2>
              <button
                onClick={addItem}
                className="btn-outline text-xs py-1.5 px-3"
              >
                <FiPlus size={14} />
                Add item
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-[#E5E2DC] p-4 relative">
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 admin-icon-btn admin-icon-btn-danger w-7 h-7"
                      title="Remove"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  )}
                  <div className="space-y-3">
                    <div>
                      <label className="admin-label">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className="admin-input"
                        placeholder="Item or service description"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="admin-label">Qty</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="admin-label">Rate (₹)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="admin-input"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="admin-label">Amount</label>
                        <input
                          type="text"
                          value={formatCurrency(item.amount)}
                          disabled
                          className="admin-input bg-[#FAFAF8] text-[#6E6B67] cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="admin-card p-6">
            <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit'] mb-4">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="admin-textarea"
              rows="3"
              placeholder="Additional notes or payment terms…"
            />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="admin-card overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5E2DC] bg-[#FAFAF8] flex items-center justify-between">
                <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit']">Invoice Preview</h2>
                <span className="text-xs text-[#6E6B67]">Mirrors the downloaded PDF</span>
              </div>

              <div ref={invoiceRef} className="p-8 bg-white">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-[#E5E2DC]">
                  <div>
                    <h1 className="text-3xl font-bold text-[#0C0C0C] mb-2 font-['Outfit'] tracking-tight">
                      {companyInfo.name}
                    </h1>
                    <p className="text-sm text-[#6E6B67]">{companyInfo.address}</p>
                    <p className="text-sm text-[#6E6B67]">{companyInfo.city}</p>
                    <p className="text-sm text-[#6E6B67] mt-2">Phone: {companyInfo.phone}</p>
                    <p className="text-sm text-[#6E6B67]">Email: {companyInfo.email}</p>
                    <p className="text-sm text-[#6E6B67]">Website: {companyInfo.website}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-3xl font-bold text-[#2563EB] mb-4 font-['Outfit'] tracking-tight">
                      INVOICE
                    </h2>
                    <div className="space-y-1 text-sm">
                      <p className="text-[#6E6B67]">
                        <span className="font-semibold text-[#0C0C0C]">Invoice #:</span> {invoiceData.invoiceNumber}
                      </p>
                      <p className="text-[#6E6B67]">
                        <span className="font-semibold text-[#0C0C0C]">Date:</span>{' '}
                        {new Date(invoiceData.invoiceDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-[#6E6B67]">
                        <span className="font-semibold text-[#0C0C0C]">Due Date:</span>{' '}
                        {new Date(invoiceData.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bill To */}
                <div className="mb-8">
                  <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-3">
                    Bill To
                  </h3>
                  <div className="bg-[#FAFAF8] border border-[#E5E2DC] p-4 rounded-lg">
                    <p className="font-semibold text-[#0C0C0C] text-base">{clientInfo.name || 'Client Name'}</p>
                    {clientInfo.email && <p className="text-sm text-[#6E6B67] mt-1">{clientInfo.email}</p>}
                    {clientInfo.phone && <p className="text-sm text-[#6E6B67]">{clientInfo.phone}</p>}
                    {clientInfo.address && <p className="text-sm text-[#6E6B67] mt-2">{clientInfo.address}</p>}
                    {clientInfo.city && <p className="text-sm text-[#6E6B67]">{clientInfo.city}</p>}
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-8 rounded-lg overflow-hidden border border-[#E5E2DC]">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2563EB] text-white">
                        <th className="text-left p-3 text-sm font-semibold">Description</th>
                        <th className="text-center p-3 text-sm font-semibold">Qty</th>
                        <th className="text-right p-3 text-sm font-semibold">Rate</th>
                        <th className="text-right p-3 text-sm font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? 'bg-[#FAFAF8]' : 'bg-white'}>
                          <td className="p-3 text-sm text-[#3D3A36]">{item.description || 'Item description'}</td>
                          <td className="p-3 text-sm text-center text-[#3D3A36]">{item.quantity}</td>
                          <td className="p-3 text-sm text-right text-[#3D3A36]">{formatCurrency(item.rate)}</td>
                          <td className="p-3 text-sm text-right text-[#0C0C0C] font-semibold">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-80">
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-[#E5E2DC]">
                        <span className="text-sm text-[#6E6B67] font-medium">Subtotal</span>
                        <span className="text-sm text-[#0C0C0C] font-semibold">
                          {formatCurrency(calculateSubtotal())}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 bg-[#2563EB] text-white px-4 rounded-lg">
                        <span className="font-bold text-lg">TOTAL</span>
                        <span className="font-bold text-lg">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {notes && (
                  <div className="mb-8 border-t border-[#E5E2DC] pt-6">
                    <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-2">
                      Notes
                    </h3>
                    <p className="text-sm text-[#3D3A36] whitespace-pre-line">{notes}</p>
                  </div>
                )}

                {/* Payment Details */}
                <div className="bg-[#FAFAF8] border border-[#E5E2DC] p-6 rounded-lg">
                  <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-3">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#6E6B67]">Bank Name</p>
                      <p className="font-semibold text-[#0C0C0C]">{paymentDetails.bankName}</p>
                    </div>
                    <div>
                      <p className="text-[#6E6B67]">Account Number</p>
                      <p className="font-semibold text-[#0C0C0C]">{paymentDetails.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-[#6E6B67]">IFSC Code</p>
                      <p className="font-semibold text-[#0C0C0C]">{paymentDetails.ifsc}</p>
                    </div>
                    <div>
                      <p className="text-[#6E6B67]">UPI ID</p>
                      <p className="font-semibold text-[#0C0C0C]">{paymentDetails.upi}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-[#E5E2DC] text-center">
                  <p className="text-xs text-[#6E6B67]">
                    This is a computer-generated invoice and does not require a signature.
                  </p>
                  <p className="text-sm text-[#2563EB] font-semibold mt-2">Thank you for your business!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
