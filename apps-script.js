// ============================================================
// GOOGLE APPS SCRIPT CODE FOR TRUVILON LEAD CAPTURE
// ============================================================
// HOW TO SETUP:
// 1. Go to https://sheets.google.com and create a new Sheet
//    Name the sheet: "Leads"
//    Add headers in Row 1:
//    Timestamp | Name | Email | Phone | Company | Service | Message
//
// 2. Click Extensions > Apps Script
// 3. Delete any existing code and paste THIS entire script
// 4. Click Save (floppy disk icon), name the project "TruviLon Leads"
// 5. Click Deploy > New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy, Authorize, copy the Web App URL
// 7. Open index.html, find this line near the bottom:
//    var SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
//    Replace with your actual URL
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Company", "Service", "Message"]);
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.service || "",
      data.message || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: "ok", message: "TRUVILON Leads API active"}))
    .setMimeType(ContentService.MimeType.JSON);
}
