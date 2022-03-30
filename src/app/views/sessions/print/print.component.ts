import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.scss"],
})
export class PrintComponent implements OnInit {
  @Input() employee :any= {};
  date: any;
  constructor() {}

  ngOnInit() {
    this.date = Date.now();
  }

  printMenu() {
    var data = document.getElementById("empolyee").innerHTML;
    setTimeout(() => {
      var newWin = window.open("");
      newWin.document.open();
      newWin.document.write(`
              <html>
                <head>
                  <title>القائمة</title>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                  <style>
                  *{
                    font-family:Cairo; 
                  }  
                  container{
                  }
                  table:first-child tbody tr th:nth-child(odd){
                    color:#000000ab;
                  }
                  </style>
                  <style type="text/css" media="print">
                      body { 
                        font-size : x-large;
                      }
                      th, td {
                        border: 1px solid #202020;
                        font-size : x-large;
                        text-align: center;
                      }
                    
                  </style>
                </head>
              <body class="text-right" dir="rtl" onload="window.print();window.close()">
              ${data}
              </body>
              </html>`);

      newWin.document.close();
    }, 100);
  }
}
