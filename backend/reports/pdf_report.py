from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(company, heading, date, insights):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()
    content = []

    # FIRST PAGE
    content.append(Paragraph(company, styles["Title"]))
    content.append(Spacer(1, 12))
    content.append(Paragraph(heading, styles["Heading2"]))
    content.append(Spacer(1, 12))
    content.append(Paragraph(f"Generated on: {date}", styles["Normal"]))
    content.append(PageBreak())

    # 2 GRAPHS + 2 INSIGHTS PER PAGE
    for i in range(0, len(insights), 2):
        for j in range(2):
            if i + j < len(insights):
                content.append(Paragraph(f"Graph {i+j+1}", styles["Heading3"]))
                content.append(Paragraph("Graph Placeholder", styles["Italic"]))
                content.append(Spacer(1, 6))
                content.append(Paragraph(insights[i+j], styles["BodyText"]))
                content.append(Spacer(1, 12))

        content.append(PageBreak())

    doc.build(content)
    buffer.seek(0)
    return buffer.read()
