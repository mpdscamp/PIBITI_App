from flask import Flask, request, jsonify, send_file
import openpyxl

from pathlib import Path
THIS_FOLDER = Path(__file__).parent.resolve()
planilha_rel = THIS_FOLDER / "Planilha_Rel.xlsx"

app = Flask(__name__)

@app.route('/edit-file', methods=['POST'])
def edit_file():
    # Parse the edit details from the request
    edit_data = request.json

    # Open the workbook
    workbook = openpyxl.load_workbook(planilha_rel)

    # Make changes to the workbook
    sheet = workbook.active
    sheet['A6'] = edit_data['relNum_value']
    sheet['C6'] = edit_data['grpDataHora_value']
    sheet['F6'] = edit_data['nomePostoGrad_value']
    sheet['I6'] = edit_data['para_value']
    sheet['A9'] = edit_data['nomeNr_value']
    sheet['E9'] = edit_data['grpDataHoraRec_value']
    sheet['I9'] = edit_data['cartaEscalaReg_value']

    # Checkbox
    if (edit_data['contatoInimigo_value'] in ['Houve contato com o inimigo', "Observado indícios de presença inimiga", "Não foi observada presença do inimigo"]):
        sheet['A14'].value = edit_data['contatoInimigo_value']
    else:
        return jsonify({'message': 'Selecione uma opção válida de presença inimiga!'})

    sheet['I14'] = edit_data['condMetTempo_value']
    sheet['I16'] = edit_data['condMetTemperatura_value']
    sheet['I18'] = edit_data['condMetChuva_value']

    # Save the workbook
    workbook.save(planilha_rel)

    # Respond with a confirmation
    return jsonify({'message': 'Edit successful'})

@app.route('/download-file', methods=['GET'])
def download_file():
    # Send the file as an attachment, this will ensure the file is downloadable
    return send_file('Planilha_Rel.xlsx', as_attachment=True)