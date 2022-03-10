import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  baseUrl = "https://toc-api.theitplatform.app/api/";

  constructor(private htpp: HttpClient) {}

  uploadFile(data) {
    return this.htpp.post(this.baseUrl + "Overtime", data);
  }
  getBymonth(data) {
    if (localStorage.getItem("roles") == '"admin"') {
      return this.htpp.get(
        this.baseUrl +
          `Employee/GetByMonth?month=${data.month}&year=${data.year}`
      );
    } else if (
      localStorage.getItem("roles") == '"contract"'
    ) {
      return this.htpp.get(
        this.baseUrl +
          `Contracts?month=${data.month}&year=${data.year}`
      );
    }
    else if (
      localStorage.getItem("roles") == '"assignment"'
    ) {
      return this.htpp.get(
        this.baseUrl +
          `Assignments?month=${data.month}&year=${data.year}`
      );
    }
  }
  getEmployeeById(employeeId) {
    return this.htpp.get(
      this.baseUrl + `Employee/GetByEmployeeId?employeeId=${employeeId}`
    );
  }
  getAllReports() {
    return this.htpp.get(this.baseUrl + `Overtime/GetAllReport`);
  }
  deleteFile(data) {
    return this.htpp.delete(
      this.baseUrl + `Overtime?month=${data.month}&year=${data.year}`
    );
  }

  getAssignmentsFile(data) {
    return this.htpp.get(
      this.baseUrl +
        `Report/GetAssignments?month=${data.month}&year=${data.year}`,
      { responseType: "blob" }
    );
  }
  getContractsFile(data) {
    return this.htpp.get(
      this.baseUrl +
        `Report/GetContracts?month=${data.month}&year=${data.year}`,
      { responseType: "blob" }
    );
  }
}
