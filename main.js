"use strict";

/* =========================================
   SỰ KIỆN GIAO DIỆN & XUẤT FILE (MAIN)
========================================= */

document.getElementById('btn-export-pdf').addEventListener('click', async function() {
    const btn = this;
    btn.textContent = '⏳ Đang tạo...';
    btn.disabled = true;
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        let yPos = margin;

        const captureZone = document.getElementById('capture-zone');
        if (captureZone) {
            const canvas1 = await html2canvas(captureZone, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
            const imgWidth = pageWidth - (margin * 2);
            const imgHeight = (canvas1.height * imgWidth) / canvas1.width;
            if (imgHeight > pageHeight - margin * 2) {
                const scaleRatio = (pageHeight - margin * 2) / imgHeight;
                const scaledWidth = imgWidth * scaleRatio;
                const scaledHeight = imgHeight * scaleRatio;
                pdf.addImage(canvas1.toDataURL('image/png'), 'PNG', (pageWidth - scaledWidth) / 2, margin, scaledWidth, scaledHeight);
                yPos = margin + scaledHeight + 5;
            } else {
                pdf.addImage(canvas1.toDataURL('image/png'), 'PNG', margin, yPos, imgWidth, imgHeight);
                yPos += imgHeight + 5;
            }
        }

        const noteText = document.getElementById('note-textarea-m3').value.trim();
        if (noteText) {
            const noteRenderDiv = document.getElementById('note-render-hidden');
            const titleHtml = '<div style="font-weight:bold; font-size:16px; color:#1b4d82; margin-bottom:8px; text-transform:uppercase; border-bottom:1px solid #dcdfe4; padding-bottom:5px;">GHI CHÚ & LUẬN GIẢI</div>';
            noteRenderDiv.innerHTML = titleHtml + noteText.replace(/\n/g, '<br>');
            
            const noteCanvas = await html2canvas(noteRenderDiv, { 
                scale: 2, 
                useCORS: true, 
                backgroundColor: '#ffffff',
                height: noteRenderDiv.scrollHeight,
                windowHeight: noteRenderDiv.scrollHeight
            });

            const noteImgWidth = pageWidth - (margin * 2);
            const noteImgHeight = (noteCanvas.height * noteImgWidth) / noteCanvas.width;

            const maxContentHeight = pageHeight - margin - 10;
            if (noteImgHeight > maxContentHeight - yPos) {
                if (yPos + 30 > maxContentHeight) {
                    pdf.addPage();
                    yPos = margin;
                }
                const availHeight = maxContentHeight - yPos;
                const scaleRatio = availHeight / noteImgHeight;
                const scaledW = noteImgWidth * scaleRatio;
                const scaledH = noteImgHeight * scaleRatio;
                pdf.addImage(noteCanvas.toDataURL('image/png'), 'PNG', margin, yPos, scaledW, scaledH);
            } else {
                pdf.addImage(noteCanvas.toDataURL('image/png'), 'PNG', margin, yPos, noteImgWidth, noteImgHeight);
            }
            noteRenderDiv.innerHTML = '';
        } else {
             pdf.setFont('helvetica', 'italic');
             pdf.setFontSize(10);
             pdf.setTextColor(160, 165, 170);
             pdf.text('(Khong co ghi chu)', margin, yPos);
        }

        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(8);
            pdf.setTextColor(153, 153, 153);
            const footerText = 'Luc Hao Bi Bo - He thong luan giai chuyen sau';
            pdf.text(footerText, (pageWidth - pdf.getStringUnitWidth(footerText) * 8 / pdf.internal.scaleFactor) / 2, pageHeight - 10);
        }

        pdf.save(`LuanGiai_LucHao_${Date.now()}.pdf`);
    } catch (e) {
        console.error(e);
        alert('Lỗi khi tạo PDF: ' + e.message);
    } finally {
        btn.textContent = '📄 Xuất PDF';
        btn.disabled = false;
    }
});

document.getElementById('btn-export').addEventListener('click', function() {
    const target = document.getElementById('capture-zone');
    html2canvas(target, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Que_LucHao_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

document.getElementById('btn-recast').addEventListener('click', function() {
    document.getElementById('dashboard-screen').style.display = 'none';
    document.getElementById('setup-screen').style.display = 'flex';
});

document.getElementById('btn-lap').addEventListener('click', () => {
    const dt = tinhData();
    if (!dt) { alert('Lỗi dữ liệu!'); return }
    if(typeof render === 'function') render(dt);
    if(typeof renderMang2 === 'function') renderMang2(dt);
    requestAnimationFrame(updateViewportVars);
});

function initForm() {
    const now = new Date();
    const tb = document.getElementById('hao-tbody');
    for (let disp = 6; disp >= 1; disp--) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${disp}</td><td class="hao-tname">Hào ${disp}</td>
      <td><select id="dd-${disp-1}"><option value="1">——— Dương</option><option value="0">— — Âm</option></select></td>
      <td style="text-align:center"><input type="checkbox" id="dong-${disp-1}"></td>`;
        tb.appendChild(tr);
    }
    const sN = document.getElementById('sel-ngay');
    for (let d = 1; d <= 31; d++) sN.add(new Option(d, d, false, d === now.getDate()));
    const sT = document.getElementById('sel-thang');
    for (let m = 1; m <= 12; m++) sT.add(new Option('Tháng ' + m, m, false, m === now.getMonth() + 1));
    const sY = document.getElementById('sel-nam');
    for (let y = now.getFullYear() - 10; y <= now.getFullYear() + 10; y++) sY.add(new Option(y, y, false, y === now.getFullYear()));
    const sG = document.getElementById('sel-gio');
    for (let h = 0; h <= 23; h++) sG.add(new Option(String(h).padStart(2, '0'), h, false, h === now.getHours()));
    const sP = document.getElementById('sel-phut');
    for (let m = 0; m <= 59; m++) sP.add(new Option(String(m).padStart(2, '0'), m, false, m === now.getMinutes()));
}

// Khởi chạy khi load trang
initForm();
