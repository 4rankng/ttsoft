---
title: Kế hoạch vận chuyển
description: "Danh sách toàn bộ chuyến đi theo kỳ tháng. Mỗi dòng tương ứng một lệnh vận chuyển — bấm vào để xem chi tiết."
sidebar:
  label: Kế hoạch vận chuyển
---

Danh sách toàn bộ chuyến đi theo kỳ tháng. Mỗi dòng tương ứng một lệnh vận chuyển — bấm vào để xem chi tiết.

[![Danh sách Kế hoạch vận chuyển với bộ chọn tháng và một dòng chuyến được đánh số 1, 2](/ttransport/assets/giamdoc-trips.webp)](/ttransport/assets/giamdoc-trips.webp)

***Danh sách chuyến.** Số ①② ứng với các bước.*

1. Chọn **tháng** cần tra cứu trên thanh trên cùng.
2. Bấm vào **dòng chuyến đi** để xem thông tin chi tiết (mã chuyến, tuyến đường, lái xe, chi phí).

[![Chi tiết chuyến với nút Chỉnh sửa và khối Phân tích tài chính được đánh số 1, 2](/ttransport/assets/giamdoc-trip-detail.webp)](/ttransport/assets/giamdoc-trip-detail.webp)

***Chi tiết chuyến đi.** Số ①② ứng với các bước thao tác chỉnh sửa.*

1. Nhấn **Chỉnh sửa** để cập nhật thông tin chuyến (tuyến đường, xe đầu kéo, lái xe, chi phí) — việc thay đổi phương tiện hoặc lái xe giữa hành trình cũng thực hiện tại đây.
2. Khối **Phân tích tài chính** hiển thị doanh thu, chi phí phát sinh và lợi nhuận của riêng chuyến đó.

[![Trang Sửa lệnh vận chuyển với nhóm trường khách hàng, tuyến, xe, lái xe, chặng hành trình và bảng Doanh thu & Lợi nhuận trực tiếp được đánh số 1, 2, 3](/ttransport/assets/giamdoc-trip-edit.webp)](/ttransport/assets/giamdoc-trip-edit.webp)

***Sửa lệnh vận chuyển.** Số ①②③ ứng với các nhóm thông tin và bảng kết quả trực tiếp.*

1. Bấm **Chỉnh sửa** trên chi tiết chuyến — mở trang sửa với đủ nhóm thông tin: khách hàng, tuyến đường & ngày, loại xe (Xe nhà / Xe ngoài), xe đầu kéo + rơ-moóc, lái xe.
2. **Hành trình chi tiết**: từng chặng điểm đi → điểm đến kèm cự ly (km) và tải trọng; thêm chặng mới ngay trong trang.
3. Bảng **Doanh thu & Lợi nhuận** bên phải tính lại **trực tiếp** khi bạn sửa: phân bố chi phí dầu / đi đường / lương và lợi nhuận dự kiến. Bấm **Lưu cập nhật** để ghi, Hủy bỏ để thoát.

#### Năm trạng thái của lệnh vận chuyển

<dl>
  <dt>Mới tạo</dt><dd>Lệnh đã lập, chưa xuất phát — có thể chưa phân xe. Chưa ghi sổ. Quản lý / Quản trị viên chuyển tiếp.</dd>
  <dt>Đang chạy</dt><dd>Đã bấm Khởi hành, xe đang trên đường. Chưa ghi sổ.</dd>
  <dt>Hoàn thành</dt><dd>Xe đã xong chuyến — <strong>tại thời điểm này doanh thu, chi phí, lương được ghi vào sổ cái</strong>.</dd>
  <dt>Đã khóa</dt><dd>Số liệu đã chốt — <strong>chỉ chuyến Đã khóa được đưa vào phân chia lợi nhuận</strong>.</dd>
  <dt>Đã hủy</dt><dd>Lệnh bỏ — mọi số tiền về 0, bút toán đã ghi được đảo ngược (chỉ khi chưa khóa).</dd>
</dl>

#### Ba quy tắc kế toán cần nhớ

<dl>
  <dt>Giấy báo nợ &amp; bảng thanh toán nhà xe</dt><dd>Chỉ tính chuyến <strong>Hoàn thành + Đã khóa</strong>.</dd>
  <dt>Báo cáo lãi lỗ</dt><dd>Chỉ tính chuyến <strong>Hoàn thành + Đã khóa</strong>.</dd>
  <dt>Phân chia lợi nhuận</dt><dd>Chỉ tính chuyến <strong>Đã khóa</strong> — lãi gộp chốt hẳn khi khóa.</dd>
</dl>

#### Sau khi khóa — ba lối xử lý từ menu ⋯

<dl>
  <dt>Điều chỉnh</dt><dd>Nhập <strong>số tiền + lý do + số phụ lục thỏa thuận</strong> (ba trường bắt buộc) — ghi bút toán điều chỉnh riêng, giữ số gốc.</dd>
  <dt>Mở khóa</dt><dd>Xác nhận *"Mở khóa chuyến này sẽ hoàn tác các bút toán tài chính đã ghi nhận"* — chuyến về Hoàn thành, sửa được rồi khóa lại (ghi sổ lại từ đầu).</dd>
  <dt>Hủy chuyến</dt><dd>Chỉ khi <strong>chưa khóa</strong> — *"Không thể hủy chuyến đi đã chốt"*. Về 0 toàn bộ số tiền, đảo bút toán đã ghi.</dd>
</dl>

:::note[Điều kiện để khóa chuyến]
phải có ít nhất 1 ảnh chuyến (loại hàng yêu cầu chứng từ thì cần cả ảnh container lẫn ảnh seal); doanh thu bằng 0 phải xác nhận lại \*"Bạn có chắc chắn muốn khóa chuyến với doanh thu bằng 0?"\*. Sau khi khóa, số đóng băng và lãi gộp được đưa vào phân chia lợi nhuận quý.
:::
