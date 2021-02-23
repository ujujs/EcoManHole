# para rodar -> python.exe '.\usb-pyhton para-bd.py'

import serial
comport = serial.Serial('COM3', 9600) 
print ('Serial Iniciada...\n')

import mysql.connector
cnx = mysql.connector.connect(user='root', password='root', host='127.0.0.1', database='exemplo')
cursor = cnx.cursor()
add_sinais = ("INSERT INTO sinais (sin_dist,id_bueiro) VALUES (%s,1)")

while (True):
  serialValue = comport.readline()
  data_sinais = serialValue.split()
  print (data_sinais)
  cursor.execute(add_sinais, data_sinais)
  cnx.commit()

cursor.close()
cnx.close()
comport.close()