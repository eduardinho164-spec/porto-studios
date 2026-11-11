/*
  RECEBER OS LEADS DO TOUR NUMA GOOGLE PLANILHA (5 minutos)

  1. Crie uma Google Planilha nova, por exemplo "Leads - Tours Construfase".
  2. Menu Extensões > Apps Script. Apague o que estiver lá e cole este arquivo inteiro. Salve.
  3. Clique em Implantar > Nova implantação > tipo "App da Web".
     - Executar como: Eu
     - Quem pode acessar: Qualquer pessoa
     Clique em Implantar e autorize com sua conta Google.
  4. Copie a "URL do app da Web" (termina em /exec).
  5. No index.html do tour, cole essa URL em:  const LEAD_ENDPOINT = "COLE_AQUI";
  6. Suba o index.html no GitHub. Cada cadastro vira uma linha na planilha, com o corretor de cada lead.

  A mesma planilha pode receber os leads de todos os tours (a coluna "empreendimento" separa as obras).
*/
const COLUNAS = ["data", "empreendimento", "evento", "nome", "telefone", "corretor", "corretor_whatsapp",
                 "origem", "mensagem", "utm_source", "utm_medium", "utm_campaign", "utm_content", "pagina"];

function doPost(e) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(COLUNAS);
  let d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) {}
  if (d.data) d.data = new Date(d.data);
  sh.appendRow(COLUNAS.map(c => d[c] || ""));
  return ContentService.createTextOutput("ok");
}
