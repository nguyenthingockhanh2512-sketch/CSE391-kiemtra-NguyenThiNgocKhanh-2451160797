/**
 * js/app.js - Logic quản lý sản phẩm
 */

// Hàm định dạng tiền tệ Việt Nam
function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

// Hàm render bảng dựa trên mảng products
function renderTable() {
    const $tableBody = $('#tableBody');
    $tableBody.empty(); // Xóa sạch nội dung cũ trước khi vẽ lại

    $.each(products, function(index, product) {
        const badgeClass = product.status === "Còn hàng" ? "badge-in-stock" : "badge-out-of-stock";
        
        // Thêm hàng vào bảng
        $tableBody.append(`
            <tr>
                <td>${index + 1}</td>
                <td class="fw-medium">${product.name}</td>
                <td>${product.category}</td>
                <td>${formatCurrency(product.price)}</td>
                <td><span class="${badgeClass}">${product.status}</span></td>
            </tr>
        `);
    });
}

$(document).ready(function() {
    // 1. Cấu hình Validate
    $("#productForm").validate({
        // Thiết lập quy tắc kiểm tra cho các trường có name tương ứng
        rules: {
            productName: { required: true, maxlength: 100 },
            productCategory: { required: true },
            productPrice: { required: true, number: true, min: 1 }
        },
        // Thông báo lỗi khi vi phạm quy tắc
        messages: {
            productName: { required: "Vui lòng nhập tên", maxlength: "Tối đa 100 ký tự" },
            productCategory: { required: "Vui lòng chọn danh mục" },
            productPrice: { required: "Vui lòng nhập giá", number: "Phải là số", min: "Phải > 0" }
        },
        // Hành động khi form hợp lệ
        submitHandler: function(form) {
            addNewProduct(); // Gọi hàm thêm sản phẩm
            form.reset();    // Làm mới form
            alert("Thêm sản phẩm mới thành công!");
        },
        // Tùy chỉnh hiển thị lỗi bằng CSS class của Bootstrap
        errorElement: 'div',
        errorClass: 'text-danger small mt-1'
    });

    // 2. Gọi hàm render ngay khi trang tải xong
    renderTable();
});

// Hàm logic thêm sản phẩm vào mảng
function addNewProduct() {
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: $('#productName').val().trim(),
        category: $('#productCategory').val(),
        price: Number($('#productPrice').val()),
        status: $('#productStatus').val()
    };

    products.push(newProduct); // Thêm vào mảng toàn cục
    renderTable();             // Vẽ lại bảng
}