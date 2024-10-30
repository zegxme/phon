let borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];

// ฟังก์ชันสำหรับเข้าสู่ระบบ
function adminLogin() {
    const password = document.getElementById("adminPassword").value;
    if (password === "1111") {
        alert("เข้าสู่ระบบสำเร็จ!");
        document.getElementById("loginSection").style.display = "none"; // ซ่อนฟอร์มรหัสผ่าน
        document.getElementById("adminSection").style.display = "block"; // แสดงระบบหลังบ้าน
        updateBorrowerList(); // อัปเดตรายการผู้ผ่อน
        updateBorrowerSelect(); // อัปเดต Dropdown ของผู้ผ่อน
    } else {
        alert("รหัสผ่านไม่ถูกต้อง!");
    }
}

// ฟังก์ชันสำหรับเพิ่มผู้ผ่อน
document.getElementById("addBorrowerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const borrowerName = document.getElementById("borrowerName").value;
    const paymentDate = document.getElementById("paymentDate").value;
    const paymentAmount = document.getElementById("paymentAmount").value;
    const remainingAmount = document.getElementById("remainingAmount").value;

    // ตรวจสอบว่าผู้ผ่อนมีอยู่แล้วหรือไม่
    const existingBorrower = borrowers.find(borrower => borrower.name === borrowerName);
    if (existingBorrower) {
        existingBorrower.payments.push({
            date: paymentDate,
            amount: paymentAmount,
            remaining: remainingAmount
        });
    } else {
        borrowers.push({
            name: borrowerName,
            payments: [{
                date: paymentDate,
                amount: paymentAmount,
                remaining: remainingAmount
            }]
        });
    }

    // บันทึกข้อมูลลง local storage
    localStorage.setItem("borrowers", JSON.stringify(borrowers));
    alert("เพิ่มผู้ผ่อนเรียบร้อยแล้ว!");
    this.reset(); // ล้างฟอร์ม
    updateBorrowerList();
    updateBorrowerSelect(); // อัปเดต Dropdown ของผู้ผ่อน
});

// ฟังก์ชันสำหรับอัปเดตรายการผู้ผ่อน
function updateBorrowerList() {
    const borrowerList = document.getElementById("borrowerList");
    borrowerList.innerHTML = ""; // ล้างรายการก่อนหน้า

    borrowers.forEach((borrower, index) => {
        borrowerList.innerHTML += `<p>${index + 1}. ${borrower.name}</p>`;
    });
}

// ฟังก์ชันสำหรับอัปเดต Dropdown ของผู้ผ่อน
function updateBorrowerSelect() {
    const borrowerSelect = document.getElementById("borrowerSelect");
    borrowerSelect.innerHTML = ""; // ล้าง Dropdown ก่อนหน้า

    borrowers.forEach(borrower => {
        const option = document.createElement("option");
        option.value = borrower.name;
        option.textContent = borrower.name;
        borrowerSelect.appendChild(option);
    });

    // เปิดใช้งานปุ่มเคลียร์ข้อมูลถ้ามีข้อมูลผู้ผ่อน
    document.getElementById("clearButton").disabled = borrowers.length === 0;
}

// ฟังก์ชันสำหรับเคลียร์ข้อมูลผู้ผ่อนที่เลือก
function clearSelectedBorrower() {
    const selectedBorrower = document.getElementById("borrowerSelect").value;
    borrowers = borrowers.filter(borrower => borrower.name !== selectedBorrower); // ลบผู้ผ่อนที่เลือก

    localStorage.setItem("borrowers", JSON.stringify(borrowers)); // อัปเดตข้อมูลใน local storage
    alert(`ข้อมูลของ ${selectedBorrower} ถูกเคลียร์เรียบร้อยแล้ว!`);
    updateBorrowerList(); // อัปเดตรายการผู้ผ่อน
    updateBorrowerSelect(); // อัปเดต Dropdown ของผู้ผ่อน
}

// ฟังก์ชันกลับไปที่หน้าค้นหาผู้ผ่อน
function goToSearchPage() {
    window.location.href = 'index.html'; // เปลี่ยนไปยังหน้า index.html
}
