import { useState, useRef } from 'react';
import { FiFileText, FiDownload, FiPlus, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import jsPDF from 'jspdf';

const Invoice = () => {
    const invoiceRef = useRef(null);
    const [loading, setLoading] = useState(false);

    // Company Info (Pre-filled)
    const [companyInfo] = useState({
        name: 'Tech Waglogy LLP',
        address: 'Tadong Metro Point',
        city: 'Gangtok, Sikkim - 737102',
        phone: '+91 97338 14168',
        email: 'waglogy.in@gmail.com',
        website: 'www.waglogy.in',
    });

    // Invoice Details
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    // Client Info
    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
    });

    // Invoice Items
    const [items, setItems] = useState([
        { id: 1, description: '', quantity: 1, rate: 0, amount: 0 }
    ]);

    // Notes and Payment Details
    const [notes, setNotes] = useState('Thank you for your business!');
    const [paymentDetails, setPaymentDetails] = useState({
        bankName: 'State Bank of India',
        accountNumber: '36819699069',
        ifsc: 'SBIN0008405',
        upi: 'techbhupesh@oksbi',
    });

    // Calculate totals
    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.amount || 0), 0);
    };



    const calculateTotal = () => {
        return calculateSubtotal();
    };

    // Handle item changes
    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => {
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
        setItems([...items, {
            id: Date.now(),
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0
        }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    // Download as PDF
    const downloadPDF = async () => {
        setLoading(true);
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            let yPos = 20;
            const leftMargin = 20;
            const rightMargin = 190;
            const pageWidth = 210;

            // Company Header
            pdf.setFontSize(24);
            pdf.setFont(undefined, 'bold');
            pdf.text(companyInfo.name, leftMargin, yPos);

            yPos += 8;
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text(companyInfo.address, leftMargin, yPos);
            yPos += 5;
            pdf.text(companyInfo.city, leftMargin, yPos);
            yPos += 5;
            pdf.text(`Phone: ${companyInfo.phone}`, leftMargin, yPos);
            yPos += 5;
            pdf.text(`Email: ${companyInfo.email}`, leftMargin, yPos);
            yPos += 5;
            pdf.text(`Website: ${companyInfo.website}`, leftMargin, yPos);

            // INVOICE Title (Right Side)
            pdf.setFontSize(22);
            pdf.setFont(undefined, 'bold');
            pdf.text('INVOICE', rightMargin, 20, { align: 'right' });

            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            pdf.text(`Invoice #: ${invoiceData.invoiceNumber}`, rightMargin, 30, { align: 'right' });
            pdf.text(`Date: ${new Date(invoiceData.invoiceDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, rightMargin, 35, { align: 'right' });
            pdf.text(`Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, rightMargin, 40, { align: 'right' });

            // Line separator
            yPos += 10;
            pdf.setLineWidth(0.5);
            pdf.line(leftMargin, yPos, rightMargin, yPos);
            yPos += 10;

            // Bill To Section
            pdf.setFontSize(12);
            pdf.setFont(undefined, 'bold');
            pdf.text('BILL TO:', leftMargin, yPos);
            yPos += 7;

            pdf.setFontSize(11);
            pdf.text(clientInfo.name || 'Client Name', leftMargin, yPos);
            yPos += 5;

            pdf.setFontSize(10);
            pdf.setFont(undefined, 'normal');
            if (clientInfo.email) {
                pdf.text(clientInfo.email, leftMargin, yPos);
                yPos += 5;
            }
            if (clientInfo.phone) {
                pdf.text(clientInfo.phone, leftMargin, yPos);
                yPos += 5;
            }
            if (clientInfo.address) {
                pdf.text(clientInfo.address, leftMargin, yPos);
                yPos += 5;
            }
            if (clientInfo.city) {
                pdf.text(clientInfo.city, leftMargin, yPos);
                yPos += 5;
            }

            yPos += 5;

            // Items Table Header
            pdf.setFillColor(0, 0, 0);
            pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 8, 'F');

            pdf.setTextColor(255, 255, 255);
            pdf.setFont(undefined, 'bold');
            pdf.setFontSize(10);
            pdf.text('Description', leftMargin + 2, yPos + 5.5);
            pdf.text('Qty', 120, yPos + 5.5, { align: 'center' });
            pdf.text('Rate', 145, yPos + 5.5, { align: 'right' });
            pdf.text('Amount', rightMargin - 2, yPos + 5.5, { align: 'right' });

            yPos += 8;
            pdf.setTextColor(0, 0, 0);
            pdf.setFont(undefined, 'normal');

            // Items
            items.forEach((item, index) => {
                const bgColor = index % 2 === 0 ? 245 : 255;
                pdf.setFillColor(bgColor, bgColor, bgColor);
                pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 7, 'F');

                pdf.text(item.description || 'Item description', leftMargin + 2, yPos + 5);
                pdf.text(String(item.quantity), 120, yPos + 5, { align: 'center' });
                pdf.text(formatCurrency(item.rate), 145, yPos + 5, { align: 'right' });
                pdf.setFont(undefined, 'bold');
                pdf.text(formatCurrency(item.amount), rightMargin - 2, yPos + 5, { align: 'right' });
                pdf.setFont(undefined, 'normal');

                yPos += 7;
            });

            yPos += 5;

            // Totals
            const totalsX = 130;
            pdf.setFont(undefined, 'normal');
            pdf.text('Subtotal:', totalsX, yPos);
            pdf.setFont(undefined, 'bold');
            pdf.text(formatCurrency(calculateSubtotal()), rightMargin - 2, yPos, { align: 'right' });

            yPos += 8;
            pdf.setFillColor(0, 0, 0);
            pdf.rect(totalsX - 5, yPos - 5, rightMargin - totalsX + 7, 8, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFont(undefined, 'bold');
            pdf.setFontSize(11);
            pdf.text('TOTAL:', totalsX, yPos);
            pdf.text(formatCurrency(calculateTotal()), rightMargin - 2, yPos, { align: 'right' });

            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(10);
            yPos += 10;

            // Notes
            if (notes) {
                pdf.setLineWidth(0.2);
                pdf.line(leftMargin, yPos, rightMargin, yPos);
                yPos += 7;

                pdf.setFont(undefined, 'bold');
                pdf.text('Notes:', leftMargin, yPos);
                yPos += 5;

                pdf.setFont(undefined, 'normal');
                const splitNotes = pdf.splitTextToSize(notes, rightMargin - leftMargin);
                pdf.text(splitNotes, leftMargin, yPos);
                yPos += splitNotes.length * 5 + 5;
            }

            // Payment Details
            pdf.setLineWidth(0.5);
            pdf.line(leftMargin, yPos, rightMargin, yPos);
            yPos += 7;

            pdf.setFont(undefined, 'bold');
            pdf.text('Payment Details:', leftMargin, yPos);
            yPos += 7;

            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(9);

            const col1X = leftMargin;
            const col2X = 110;

            pdf.setFont(undefined, 'normal');
            pdf.text('Bank Name:', col1X, yPos);
            pdf.setFont(undefined, 'bold');
            pdf.text(paymentDetails.bankName, col1X, yPos + 4);

            pdf.setFont(undefined, 'normal');
            pdf.text('Account Number:', col2X, yPos);
            pdf.setFont(undefined, 'bold');
            pdf.text(paymentDetails.accountNumber, col2X, yPos + 4);

            yPos += 10;

            pdf.setFont(undefined, 'normal');
            pdf.text('IFSC Code:', col1X, yPos);
            pdf.setFont(undefined, 'bold');
            pdf.text(paymentDetails.ifsc, col1X, yPos + 4);

            pdf.setFont(undefined, 'normal');
            pdf.text('UPI ID:', col2X, yPos);
            pdf.setFont(undefined, 'bold');
            pdf.text(paymentDetails.upi, col2X, yPos + 4);

            yPos += 12;

            // Footer
            pdf.setLineWidth(0.2);
            pdf.line(leftMargin, yPos, rightMargin, yPos);
            yPos += 5;

            pdf.setFont(undefined, 'normal');
            pdf.setFontSize(8);
            pdf.text('This is a computer-generated invoice and does not require a signature.', pageWidth / 2, yPos, { align: 'center' });
            yPos += 5;
            pdf.setFont(undefined, 'bold');
            pdf.text('Thank you for your business!', pageWidth / 2, yPos, { align: 'center' });

            pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black flex items-center">
                        <FiFileText className="mr-3" />
                        Invoice Generator
                    </h1>
                    <p className="text-gray-600 mt-2">Create and download professional invoices</p>
                </div>
                <button
                    onClick={downloadPDF}
                    disabled={loading || !clientInfo.name}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${loading || !clientInfo.name
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating...
                        </>
                    ) : (
                        <>
                            <FiDownload className="mr-2" />
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Form */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Invoice Details */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                            <FiCalendar className="mr-2" />
                            Invoice Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    value={invoiceData.invoiceNumber}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invoice Date
                                </label>
                                <input
                                    type="date"
                                    value={invoiceData.invoiceDate}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={invoiceData.dueDate}
                                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Client Information */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                            <FiUser className="mr-2" />
                            Client Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client Name *
                                </label>
                                <input
                                    type="text"
                                    value={clientInfo.name}
                                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                    placeholder="Company / Person Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={clientInfo.email}
                                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                    placeholder="client@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={clientInfo.phone}
                                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                    placeholder="+91 XXXXXXXXXX"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={clientInfo.address}
                                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                    placeholder="Street Address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City, State - ZIP
                                </label>
                                <input
                                    type="text"
                                    value={clientInfo.city}
                                    onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                    placeholder="City, State - 000000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-black">Invoice Items</h2>
                            <button
                                onClick={addItem}
                                className="flex items-center px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm"
                            >
                                <FiPlus className="mr-1" />
                                Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={item.id} className="border border-gray-200 rounded-lg p-4 relative">
                                    {items.length > 1 && (
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    )}
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                                placeholder="Item or service description"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                                    min="1"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Rate (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent text-black"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Amount
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formatCurrency(item.amount)}
                                                    disabled
                                                    className="w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-sm text-gray-700"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-black mb-4">Notes</h2>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                            rows="3"
                            placeholder="Additional notes or payment terms..."
                        />
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="lg:col-span-2">
                    <div className="sticky top-6">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-4">
                                <h2 className="text-xl font-bold">Invoice Preview</h2>
                            </div>

                            {/* Invoice Preview (to be captured as PDF) */}
                            <div ref={invoiceRef} className="p-8 bg-white">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-black">
                                    <div>
                                        <h1 className="text-4xl font-bold text-black mb-2">{companyInfo.name}</h1>
                                        <p className="text-gray-600">{companyInfo.address}</p>
                                        <p className="text-gray-600">{companyInfo.city}</p>
                                        <p className="text-gray-600 mt-2">Phone: {companyInfo.phone}</p>
                                        <p className="text-gray-600">Email: {companyInfo.email}</p>
                                        <p className="text-gray-600">Website: {companyInfo.website}</p>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-3xl font-bold text-black mb-4">INVOICE</h2>
                                        <div className="space-y-1">
                                            <p className="text-gray-600">
                                                <span className="font-semibold text-black">Invoice #:</span> {invoiceData.invoiceNumber}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-semibold text-black">Date:</span> {new Date(invoiceData.invoiceDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-semibold text-black">Due Date:</span> {new Date(invoiceData.dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bill To */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-black mb-3">BILL TO:</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-bold text-black text-lg">{clientInfo.name || 'Client Name'}</p>
                                        {clientInfo.email && <p className="text-gray-600 mt-1">{clientInfo.email}</p>}
                                        {clientInfo.phone && <p className="text-gray-600">{clientInfo.phone}</p>}
                                        {clientInfo.address && <p className="text-gray-600 mt-2">{clientInfo.address}</p>}
                                        {clientInfo.city && <p className="text-gray-600">{clientInfo.city}</p>}
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="mb-8">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-black text-white">
                                                <th className="text-left p-3 font-semibold">Description</th>
                                                <th className="text-center p-3 font-semibold">Qty</th>
                                                <th className="text-right p-3 font-semibold">Rate</th>
                                                <th className="text-right p-3 font-semibold">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="p-3 text-gray-800">{item.description || 'Item description'}</td>
                                                    <td className="p-3 text-center text-gray-800">{item.quantity}</td>
                                                    <td className="p-3 text-right text-gray-800">{formatCurrency(item.rate)}</td>
                                                    <td className="p-3 text-right text-gray-800 font-semibold">{formatCurrency(item.amount)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Totals */}
                                <div className="flex justify-end mb-8">
                                    <div className="w-80">
                                        <div className="space-y-2">
                                            <div className="flex justify-between py-2 border-b border-gray-200">
                                                <span className="text-gray-600 font-medium">Subtotal:</span>
                                                <span className="text-gray-800 font-semibold">{formatCurrency(calculateSubtotal())}</span>
                                            </div>
                                            <div className="flex justify-between py-3 bg-black text-white px-4 rounded-lg">
                                                <span className="font-bold text-lg">TOTAL:</span>
                                                <span className="font-bold text-lg">{formatCurrency(calculateTotal())}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                {notes && (
                                    <div className="mb-8 border-t-2 border-gray-200 pt-6">
                                        <h3 className="text-lg font-bold text-black mb-2">Notes:</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{notes}</p>
                                    </div>
                                )}

                                {/* Payment Details */}
                                <div className="bg-gray-50 p-6 rounded-lg border-t-2 border-black">
                                    <h3 className="text-lg font-bold text-black mb-3">Payment Details:</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Bank Name:</p>
                                            <p className="font-semibold text-black">{paymentDetails.bankName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Account Number:</p>
                                            <p className="font-semibold text-black">{paymentDetails.accountNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">IFSC Code:</p>
                                            <p className="font-semibold text-black">{paymentDetails.ifsc}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">UPI ID:</p>
                                            <p className="font-semibold text-black">{paymentDetails.upi}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-gray-600 text-sm">
                                        This is a computer-generated invoice and does not require a signature.
                                    </p>
                                    <p className="text-black font-semibold mt-2">Thank you for your business!</p>
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
