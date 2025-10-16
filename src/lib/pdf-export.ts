import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportToPDF(elementId: string, filename: string = 'resume.pdf') {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Resume element not found. Please make sure you are on the preview tab.')
    }

    // Show loading state
    const loadingToast = document.createElement('div')
    loadingToast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>Generating PDF...</span>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `
    loadingToast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #1f2937;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `
    document.body.appendChild(loadingToast)

    // Store original styles
    const originalStyles = element.style.cssText
    
    // Create a dedicated container for PDF rendering with proper constraints
    const pdfContainer = document.createElement('div')
    pdfContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 210mm;
      min-height: 297mm;
      background: white;
      padding: 20px;
      box-sizing: border-box;
      z-index: -1;
      overflow: hidden;
    `
    
    // Clone the element for PDF rendering
    const elementClone = element.cloneNode(true) as HTMLElement
    elementClone.id = 'resume-content-pdf'
    
    // Get the computed styles from the original element
    const originalComputedStyles = window.getComputedStyle(element)
    
    // Apply the exact same styles with proper constraints
    elementClone.style.cssText = `
      ${originalStyles}
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      background: white;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      font-family: ${originalComputedStyles.fontFamily};
      line-height: ${originalComputedStyles.lineHeight};
      color: ${originalComputedStyles.color};
    `
    
    // Add the clone to the PDF container
    pdfContainer.appendChild(elementClone)
    document.body.appendChild(pdfContainer)
    
    // Force render all styles by getting computed styles
    const allElements = elementClone.querySelectorAll('*')
    allElements.forEach(el => {
      const element = el as HTMLElement
      const computedStyle = window.getComputedStyle(el)
      
      // Preserve all computed styles with proper text wrapping
      element.style.cssText += `
        color: ${computedStyle.color} !important;
        background-color: ${computedStyle.backgroundColor} !important;
        border-color: ${computedStyle.borderColor} !important;
        font-family: ${computedStyle.fontFamily} !important;
        font-size: ${computedStyle.fontSize} !important;
        font-weight: ${computedStyle.fontWeight} !important;
        line-height: ${computedStyle.lineHeight} !important;
        letter-spacing: ${computedStyle.letterSpacing} !important;
        text-align: ${computedStyle.textAlign} !important;
        padding: ${computedStyle.padding} !important;
        margin: ${computedStyle.margin} !important;
        border: ${computedStyle.border} !important;
        border-radius: ${computedStyle.borderRadius} !important;
        box-shadow: ${computedStyle.boxShadow} !important;
        display: ${computedStyle.display} !important;
        position: ${computedStyle.position} !important;
        width: ${computedStyle.width} !important;
        height: ${computedStyle.height} !important;
        min-width: ${computedStyle.minWidth} !important;
        min-height: ${computedStyle.minHeight} !important;
        max-width: ${computedStyle.maxWidth} !important;
        max-height: ${computedStyle.maxHeight} !important;
        overflow: ${computedStyle.overflow} !important;
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        white-space: ${computedStyle.whiteSpace} !important;
        text-overflow: ellipsis !important;
        z-index: ${computedStyle.zIndex} !important;
        opacity: ${computedStyle.opacity} !important;
        transform: ${computedStyle.transform} !important;
        transition: none !important;
        animation: none !important;
        box-sizing: border-box !important;
      `
      
      // Handle gradient backgrounds specifically
      if (computedStyle.background && computedStyle.background.includes('gradient')) {
        element.style.background = computedStyle.background
        element.style.backgroundImage = computedStyle.backgroundImage
        element.style.backgroundSize = computedStyle.backgroundSize
        element.style.backgroundPosition = computedStyle.backgroundPosition
        element.style.backgroundRepeat = computedStyle.backgroundRepeat
        element.style.backgroundOrigin = computedStyle.backgroundOrigin
        element.style.backgroundClip = computedStyle.backgroundClip
        element.style.backgroundAttachment = computedStyle.backgroundAttachment
      }
    })
    
    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Add custom CSS to ensure gradients are preserved and text wraps properly
    const styleElement = document.createElement('style')
    styleElement.textContent = `
      #resume-content-pdf * {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        box-sizing: border-box !important;
      }
      
      #resume-content-pdf {
        max-width: 100% !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      
      #resume-content-pdf > div {
        max-width: 100% !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      
      #resume-content-pdf .bg-gradient-to-r {
        background: linear-gradient(to right, var(--tw-gradient-stops)) !important;
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        overflow: hidden !important;
      }
      
      #resume-content-pdf .from-blue-600 {
        --tw-gradient-from: #2563eb !important;
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(37 99 235 / 0)) !important;
      }
      
      #resume-content-pdf .to-blue-800 {
        --tw-gradient-to: #1e40af !important;
      }
      
      #resume-content-pdf .from-purple-600 {
        --tw-gradient-from: #9333ea !important;
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(147 51 234 / 0)) !important;
      }
      
      #resume-content-pdf .via-pink-600 {
        --tw-gradient-stops: var(--tw-gradient-from), #db2777, var(--tw-gradient-to, rgb(219 39 121 / 0)) !important;
      }
      
      #resume-content-pdf .to-red-600 {
        --tw-gradient-to: #dc2626 !important;
      }
      
      #resume-content-pdf .text-blue-600 { color: #2563eb !important; }
      #resume-content-pdf .text-purple-600 { color: #9333ea !important; }
      #resume-content-pdf .text-pink-600 { color: #db2777 !important; }
      #resume-content-pdf .text-gray-800 { color: #1f2937 !important; }
      #resume-content-pdf .text-gray-700 { color: #374151 !important; }
      #resume-content-pdf .text-gray-600 { color: #4b5563 !important; }
      #resume-content-pdf .text-white { color: #ffffff !important; }
      
      #resume-content-pdf .bg-blue-600 { background-color: #2563eb !important; }
      #resume-content-pdf .bg-purple-600 { background-color: #9333ea !important; }
      #resume-content-pdf .bg-pink-600 { background-color: #db2777 !important; }
      #resume-content-pdf .bg-gray-800 { background-color: #1f2937 !important; }
      #resume-content-pdf .bg-white { background-color: #ffffff !important; }
      
      #resume-content-pdf .border-blue-600 { border-color: #2563eb !important; }
      #resume-content-pdf .border-gray-800 { border-color: #1f2937 !important; }
      #resume-content-pdf .border-gray-300 { border-color: #d1d5db !important; }
      
      #resume-content-pdf p, #resume-content-pdf div, #resume-content-pdf span {
        max-width: 100% !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        word-break: break-word !important;
      }
      
      #resume-content-pdf section {
        max-width: 100% !important;
        overflow: hidden !important;
        margin-bottom: 2rem !important;
      }
      
      #resume-content-pdf .flex {
        flex-wrap: wrap !important;
        max-width: 100% !important;
      }
      
      #resume-content-pdf .grid {
        max-width: 100% !important;
      }
    `
    pdfContainer.appendChild(styleElement)
    
    // Wait for styles to apply again
    await new Promise(resolve => setTimeout(resolve, 300))

    // Create canvas from the cloned element with better settings
    const canvas = await html2canvas(elementClone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: elementClone.scrollWidth,
      height: elementClone.scrollHeight,
      windowWidth: elementClone.scrollWidth,
      windowHeight: elementClone.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      removeContainer: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('resume-content-pdf')
        if (clonedElement) {
          // Ensure all computed styles are preserved
          const allClonedElements = clonedElement.querySelectorAll('*')
          allClonedElements.forEach(el => {
            const element = el as HTMLElement
            element.style.visibility = 'visible'
            element.style.opacity = '1'
            element.style.overflow = 'hidden'
            element.style.wordWrap = 'break-word'
            element.style.overflowWrap = 'break-word'
          })
        }
      }
    })

    // Clean up
    document.body.removeChild(pdfContainer)
    if (document.body.contains(loadingToast)) {
      document.body.removeChild(loadingToast)
    }

    // Get the canvas dimensions
    const imgData = canvas.toDataURL('image/png', 1.0)
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    // Calculate PDF dimensions (A4 size: 210mm x 297mm at 150 DPI for better fit)
    const mmToPx = 150 / 25.4
    const pdfWidth = 210 * mmToPx
    const pdfHeight = 297 * mmToPx

    // Calculate scaling to fit A4 while maintaining aspect ratio with better margins
    const scaleX = (pdfWidth * 0.9) / imgWidth  // Use 90% of width for margins
    const scaleY = (pdfHeight * 0.85) / imgHeight // Use 85% of height for margins
    const scale = Math.min(scaleX, scaleY)

    const scaledWidth = imgWidth * scale
    const scaledHeight = imgHeight * scale

    // Calculate position to center the content
    const x = (pdfWidth - scaledWidth) / 2
    const y = (pdfHeight - scaledHeight) / 2

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight]
    })
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight)

    // Save the PDF
    pdf.save(filename)
    
    return true
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to export PDF')
  }
}

export async function exportToPDFFallback(elementId: string, filename: string = 'resume.pdf') {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error('Resume element not found. Please make sure you are on the preview tab.')
    }

    // Create print window with enhanced styling
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      throw new Error('Could not open print window. Please allow popups and try again.')
    }

    // Get the HTML content
    const htmlContent = element.outerHTML
    
    // Create enhanced print document with all styles preserved
    const printDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${filename}</title>
          <meta charset="utf-8">
          <style>
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 15px;
              background: white;
              line-height: 1.6;
            }
            
            .no-print {
              display: none !important;
            }
            
            /* Resume container */
            #resume-content {
              max-width: 210mm !important;
              margin: 0 auto !important;
              background: white !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            
            /* Preserve gradients with explicit values */
            .bg-gradient-to-r.from-blue-600.to-blue-800 {
              background: linear-gradient(to right, #2563eb, #1e40af) !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            .bg-gradient-to-r.from-purple-600.via-pink-600.to-red-600 {
              background: linear-gradient(to right, #9333ea, #db2777, #dc2626) !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* Preserve all colors */
            .text-blue-600 { color: #2563eb !important; }
            .text-purple-600 { color: #9333ea !important; }
            .text-pink-600 { color: #db2777 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            .text-white { color: #ffffff !important; }
            
            .bg-blue-600 { background-color: #2563eb !important; }
            .bg-purple-600 { background-color: #9333ea !important; }
            .bg-pink-600 { background-color: #db2777 !important; }
            .bg-gray-800 { background-color: #1f2937 !important; }
            .bg-white { background-color: #ffffff !important; }
            
            .border-blue-600 { border-color: #2563eb !important; }
            .border-gray-800 { border-color: #1f2937 !important; }
            .border-gray-300 { border-color: #d1d5db !important; }
            
            /* Preserve layout */
            .flex { display: flex !important; }
            .grid { display: grid !important; }
            .text-center { text-align: center !important; }
            .font-bold { font-weight: bold !important; }
            .font-semibold { font-weight: 600 !important; }
            
            @media print {
              body {
                margin: 0;
                padding: 10px;
                background: white;
              }
              
              @page {
                margin: 10mm;
                size: A4;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `

    printWindow.document.write(printDocument)
    printWindow.document.close()
    
    return true
  } catch (error) {
    console.error('Error with print fallback:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to prepare resume for printing')
  }
}

export async function exportToPDFWithRetry(elementId: string, filename: string = 'resume.pdf', maxRetries: number = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`PDF export attempt ${attempt}/${maxRetries}`)
      await exportToPDF(elementId, filename)
      return true
    } catch (error) {
      console.error(`PDF export attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        console.log('Trying print fallback...')
        try {
          await exportToPDFFallback(elementId, filename)
          return true
        } catch (fallbackError) {
          console.error('Print fallback also failed:', fallbackError)
          throw new Error('Failed to export PDF. Please try the print option instead.')
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  return false
}