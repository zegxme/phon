// ฟังก์ชันเคลียร์ข้อมูลผู้ผ่อนทั้งหมด
function clearAllBorrowers() {
    // ยืนยันการล้างข้อมูล
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการเคลียร์ข้อมูลผู้ผ่อนทั้งหมด?")) {
        // ลบข้อมูลผู้ผ่อนจาก Local Storage
        localStorage.removeItem('borrowers');

        // อัปเดต UI
        document.getElementById("borrowerDetails").innerHTML = ""; // เคลียร์รายละเอียดการแสดงผล
        document.getElementById("paymentDetails").innerHTML = ""; // เคลียร์ประวัติการผ่อน
        document.getElementById("borrowerInfo").style.display = "none"; // ซ่อนส่วนข้อมูลผู้ผ่อน
        
        alert("เคลียร์ข้อมูลผู้ผ่อนทั้งหมดแล้ว!");
    }
}

// ฟังก์ชันค้นหาผู้ผ่อน
function searchBorrower() {
    const borrowerName = document.getElementById("searchBorrower").value;
    const borrowers = JSON.parse(localStorage.getItem('borrowers')) || [];
    
    const result = borrowers.filter(borrower => borrower.name === borrowerName);
    
    const borrowerDetails = document.getElementById("borrowerDetails");
    const borrowerInfo = document.getElementById("borrowerInfo");
    const paymentHistory = document.getElementById("paymentHistory");
    const paymentDetails = document.getElementById("paymentDetails");
    
    borrowerDetails.innerHTML = ""; // เคลียร์ข้อมูลเก่า
    paymentDetails.innerHTML = ""; // เคลียร์ประวัติการผ่อน
    
    if (result.length > 0) {
        borrowerInfo.style.display = "block"; // แสดงข้อมูลผู้ผ่อน
        result.forEach(borrower => {
            const borrowerInfoText = document.createElement("p");
            borrowerInfoText.textContent = `ชื่อผู้ผ่อน: ${borrower.name}`;
            borrowerDetails.appendChild(borrowerInfoText);
            
            // แสดงประวัติการผ่อน
            if (borrower.payments) {
                paymentHistory.style.display = "block"; // แสดงประวัติการผ่อน
                borrower.payments.forEach(payment => {
                    const paymentInfo = document.createElement("p");
                    paymentInfo.textContent = `วันที่ส่งยอดผ่อน: ${payment.date}, จำนวนเงิน: ${payment.amount}, ยอดคงเหลือ: ${payment.remaining}`;
                    paymentDetails.appendChild(paymentInfo);
                });
            }
        });
    } else {
        borrowerDetails.textContent = "ไม่พบข้อมูลผู้ผ่อน!";
        borrowerInfo.style.display = "block"; // แสดงข้อความเมื่อไม่พบข้อมูล
    }
}

// ฟังก์ชันสำหรับกลับไปที่หน้าค้นหาผู้ผ่อน
function goBackToSearch() {
    document.getElementById("borrowerInfo").style.display = "none"; // ซ่อนข้อมูลผู้ผ่อน
    document.getElementById("searchBorrower").value = ""; // เคลียร์ช่องค้นหา
}

// ฟังก์ชันสำหรับไปยังระบบหลังบ้าน
function goToAdmin() {
    window.location.href = 'admin.html'; // นำไปยังหน้าระบบหลังบ้าน
}
