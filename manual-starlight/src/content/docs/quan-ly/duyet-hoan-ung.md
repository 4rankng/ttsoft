---
title: Duyệt hoàn ứng
description: Sau khi kết thúc chuyến đi, nhân viên gửi phiếu hoàn ứng đối soát chi phí thực tế so với tiền tạm ứng.
sidebar:
  label: Duyệt hoàn ứng
---

Sau khi kết thúc chuyến đi, nhân viên gửi phiếu hoàn ứng đối soát chi phí thực tế so với tiền tạm ứng.

[![Trang Duyệt hoàn ứng với tab Chờ xử lý và bộ chọn tháng được đánh số 1, 2](/ttransport/assets/giamdoc-advsettle.webp)](/ttransport/assets/giamdoc-advsettle.webp)

***Duyệt hoàn ứng.** Số ①② ứng với tab chờ xử lý và đổi tháng.*

1. Mở tab **Chờ xử lý**, kiểm tra chứng từ đính kèm của từng phiếu.
2. Bấm duyệt phiếu nếu chứng từ hợp lệ để hoàn tất chu trình tạm ứng.

#### Phiếu thanh toán đi qua ba bước

<dl>
  <dt>Chờ xử lý</dt><dd>Giao nhận lập phiếu PT-MMYY-#### từ các tạm ứng Đã duyệt + chi phí Đã kê xong; phiếu phải <strong>cân đối</strong>: tạm ứng đưa vào + công ty hoàn thêm = tổng chi phí + giao nhận hoàn trả (sai quá 1₫ bị chặn; không thể vừa hoàn thêm vừa hoàn trả).</dd>
  <dt>KT đã kiểm tra</dt><dd><strong>Kế toán / Quản trị viên</strong> kiểm tra và được <strong>sửa số tiền từng khoản chi kèm lý do</strong> — bước kiểm riêng trước khi duyệt.</dd>
  <dt>Đã duyệt / Từ chối</dt><dd>Quản trị/Quản lý/Kế toán duyệt (không tự duyệt phiếu của chính mình).</dd>
</dl>

#### Khi bấm Duyệt, hệ thống làm bốn việc

<dl>
  <dt>1 · Duyệt khoản chi</dt><dd>Các khoản chi trong phiếu chuyển <strong>Chờ duyệt → Đã duyệt</strong>.</dd>
  <dt>2 · Phí tính khách</dt><dd>Ghi <strong>phí tính khách</strong> vào công nợ khách hàng cho từng chi phí gắn chuyến đã xong (số "sell" của mỗi khoản chi hộ).</dd>
  <dt>3 · Ghi bút toán tạm ứng</dt><dd>Thanh toán số tạm ứng đã cấp cho giao nhận.</dd>
  <dt>4 · Dư tiền sang kỳ</dt><dd>Nếu giao nhận còn dư (hoàn trả &gt; 0): hệ thống <strong>tự tạo yêu cầu tạm ứng mới đã duyệt</strong> mang số dư sang kỳ sau — tiền vẫn nằm ở hiện trường.</dd>
</dl>

:::note[Bản in phiếu]
số phiếu · ngày lập · nhân viên; mục "Tạm ứng đã nhận" (tiền, nội dung, ngày, tổng); chi phí nhóm theo loại **Nâng hạ · Hạ tầng · Thủ tục HQ · Cân hàng · Kiểm tra · Khác**; nút In / Excel.
:::

[![Trang Duyệt hoàn ứng với các phiếu thanh toán chờ xử lý và đã duyệt](/ttransport/assets/giamdoc-settlement-view.webp)](/ttransport/assets/giamdoc-settlement-view.webp)

***Duyệt hoàn ứng** theo kỳ — kiểm tra chứng từ từng phiếu rồi duyệt; phiếu đã duyệt trừ vào tồn tạm ứng.*
