---
title: Công nợ phải thu
description: Theo dõi số tiền khách hàng còn nợ theo hạn thanh toán kèm mã màu cảnh báo công nợ sắp đến hạn.
sidebar:
  label: Công nợ phải thu
---

Theo dõi số tiền khách hàng còn nợ theo hạn thanh toán kèm mã màu cảnh báo công nợ sắp đến hạn.

[![Công nợ phải thu với thẻ một khách hàng và bộ chọn tháng được đánh số 1, 2](/ttransport/assets/giamdoc-debt.webp)](/ttransport/assets/giamdoc-debt.webp)

***Công nợ phải thu.** Số ①② ứng với mở thẻ khách hàng và đổi kỳ.*

1. Bấm vào **thẻ khách hàng** để xem sổ chi tiết: danh sách chuyến, đợt thanh toán và hóa đơn.
2. Đổi **tháng** để đối chiếu số dư nợ lũy kế qua từng kỳ.

[![Sổ chi tiết công nợ khách hàng với các thẻ tổng quan, phân bố tuổi nợ và nút Ghi nhận thanh toán được đánh số 1, 2, 3](/ttransport/assets/giamdoc-debt-customer.webp)](/ttransport/assets/giamdoc-debt-customer.webp)

***Sổ chi tiết khách hàng.** Số ①②③ ứng với các khối thông tin.*

1. Bấm vào **thẻ khách hàng** để mở sổ chi tiết: dư nợ hiện tại, số chuyến chưa thu và nhóm tuổi nợ nổi bật (①).
2. Dải **Phân bố tuổi nợ** cho biết từng bucket chiếm bao nhiêu % tổng công nợ (②) — có cảnh báo riêng khi có nợ quá hạn trên 90 ngày.
3. Bấm **Ghi nhận thanh toán** (③) để ghi đợt tiền khách vừa chuyển.

[![Hộp thoại Ghi nhận thanh toán với Số tiền nhận, Ngày nhận, Mã biên lai phiếu thu và nút Ghi nhận được đánh số 1, 2, 3, 4](/ttransport/assets/giamdoc-debt-receipt.webp)](/ttransport/assets/giamdoc-debt-receipt.webp)

***Ghi nhận thanh toán.** Số ①②③④ ứng với các trường của hộp thoại.*

1. Nhập **Số tiền nhận** — hệ thống phân bổ **FIFO** vào các chuyến còn nợ, bắt đầu từ chuyến cũ nhất.
2. Chọn **Ngày nhận** (mặc định hôm nay; được chọn ngày trước để ghi nhận bổ sung, không nhận ngày tương lai).
3. Nhập **Mã biên lai / phiếu thu** — bắt buộc, đối chiếu với sao kê ngân hàng / sổ quỹ.
4. Bấm **Ghi nhận** — số dư, bucket tuổi nợ và phân bố tự cập nhật lại toàn bộ.

#### Bốn trạng thái công nợ của một khách hàng

<dl>
  <dt>Nợ quá hạn</dt><dd>Có hóa đơn mở đã quá hạn thanh toán theo hợp đồng.</dd>
  <dt>Trong hạn</dt><dd>Nợ nhưng chưa đến hạn.</dd>
  <dt>Trả trước</dt><dd>Số dư âm — khách trả trước.</dd>
  <dt>Đã thanh toán đủ</dt><dd>Số dư bằng 0.</dd>
</dl>

#### Nợ của khách từ đâu ra

<dl>
  <dt>Chuyến hoàn tất</dt><dd>Chuyến <strong>Hoàn thành / Đã khóa</strong> ghi doanh thu (gồm VAT) vào công nợ khách.</dd>
  <dt>Phụ phí tính khách</dt><dd>Ghi thêm khi <strong>phiếu thanh toán được duyệt</strong> (số "tính lại khách" của các khoản chi hộ).</dd>
  <dt>Điều chỉnh</dt><dd>Tăng/giảm bằng bút toán điều chỉnh kèm lý do.</dd>
  <dt>Khách trả tiền</dt><dd>Mục <strong>Phiếu thu → Ghi nhận thanh toán</strong>: số tiền + ngày nhận (không lớn hơn hôm nay) + mã phiếu — khoản thu phân bổ <strong>FIFO</strong> vào các chuyến còn nợ, cũ nhất trước. Sửa/xóa bản thu → hệ thống tính lại số dư và phân bổ.</dd>
</dl>

#### Ba tab làm việc của chi tiết công nợ

<dl>
  <dt>Thanh toán</dt><dd>Các chuyến còn nợ của khách.</dd>
  <dt>Bảng kê</dt><dd>Lập chứng từ thanh toán.</dd>
  <dt>Giấy báo nợ</dt><dd>Chứng từ nhắc nợ gửi khách, lập từ chuyến Hoàn thành/Đã khóa theo <strong>hai chế độ: theo tháng hoặc theo lô</strong>; mỗi dòng là cước vận chuyển / phí dịch vụ / khoản phụ. Công ty cấu hình <strong>mẫu Excel riêng</strong> — bản đã xuất đóng băng mẫu tại thời điểm xuất.</dd>
</dl>

:::note[Khách hàng "Rủi ro cao"]
(nợ lớn hoặc hóa đơn trên 90 ngày) có bộ lọc riêng để tập trung thu hồi; danh mục khách hàng còn có **hạn mức tín dụng** — chạm hạn mức thì xử trước khi nhận thêm hàng.
:::

[![Tab Bảng kê trong chi tiết công nợ khách hàng — lập chứng từ thanh toán](/ttransport/assets/giamdoc-debt-bangke.webp)](/ttransport/assets/giamdoc-debt-bangke.webp)

***Tab Bảng kê** — lập chứng từ thanh toán cho khách.*

[![Tab Giấy báo nợ trong chi tiết công nợ khách hàng — nhắc nợ theo mẫu Excel công ty cấu hình](/ttransport/assets/giamdoc-debt-baono.webp)](/ttransport/assets/giamdoc-debt-baono.webp)

***Tab Giấy báo nợ** — nhắc nợ theo mẫu Excel của công ty; bản đã xuất giữ nguyên mẫu tại thời điểm xuất.*
