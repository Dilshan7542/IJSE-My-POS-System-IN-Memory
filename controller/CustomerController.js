import {customerList} from "../db/db.js";
import {Customer} from "../model/Customer.js";

export class CustomerController {

    constructor() {

        $("#customerBtnSection>:nth-child(1)").click(this.handleSaveCustomer.bind(this));
        $("#customerBtnSection>:nth-child(2)").click(this.handleUpdateCustomer.bind(this));
        $("#customerBtnSection>:nth-child(3)").click(this.handelDeleteCustomer.bind(this));
        $("#customerBtnSection>:nth-child(4)").click(this.btnNewCustomer.bind(this));
        $("#searchCustomer").on("keyup", this.searchCustomer.bind(this));
        this.customerList2 = customerList;
        this.loadAllCustomer();

    }

    handleSaveCustomer(e) {
        for (let customer of this.customerList2) {
            if (customer._id === $("#customerID").val()) {
                alert("Customer Exist...!");
                this.clearTextField();
                return;
            }
        }
        if (this.isValid()) {
            let id = $("#customerID").val();
            let name = $("#customerName").val();
            let address = $("#customerAddress").val();
            let salary = $("#customerSalary").val();
            this.customerList2.push(new Customer(id, name, address, salary));
            this.loadAllCustomer();
        }


    }

    isValid() {
        let id = /^C([0-9]){3,3}$/;
        let name = /^([A-z]){2,}$/;
        let salary = /^\d+(\.\d)?\d*$/

        if (!id.test($("#customerID").val())) {
            $("#customerID").css("border-color","red");
            return false;
        } else {
            if (!name.test($("#customerName").val())) {
                $("#customerName").css("border-color","red");
                return false;
            } else {
                if ($("#customerAddress").val() === "") {
                    $("#customerAddress").css("border-color","red");
                    return false;
                } else {
                    if (!salary.test($("#customerSalary").val())) {
                        $("#customerSalary").css("border-color","red");
                        return false;
                    } else {
                        return true;
                    }

                }
            }
        }
    }

    handleUpdateCustomer() {
        if (this.isValid()) {
            let id = $("#customerID").val();
            let name = $("#customerName").val();
            let address = $("#customerAddress").val();
            let salary = $("#customerSalary").val();
            this.customerList2.forEach((e) => {
                if (e._id === id) {
                    e._name = name;
                    e._address = address;
                    e._salary = salary;
                }
            });
            this.loadAllCustomer();
        }
    }

    handelDeleteCustomer() {
        this.customerList2= this.customerList2.filter(function (e){ return e._id !== $("#customerID").val()});
      test=this.customerList2;
      this.loadAllCustomer();
    }

    searchCustomer(e) {

        let filter = this.customerList2.filter(e => e.name.startsWith($("#searchCustomer").val()) || e.name.toLowerCase().startsWith($("#searchCustomer").val()));

        if ($("#searchCustomer").val() === "") {
            this.loadAllCustomer();
        } else {
            $("#tblCustomerBody").html("");
            filter.forEach(e => {
                $("#tblCustomerBody").append(`<tr> <td>${e.id}</td><td>${e.name}</td><td>${e.address}</td><td>${e.salary}</td></tr>`);
                $("#tblCustomerBody>:last-child").click((e) => {
                    this.manageControlBtn(e);
                });
            });
        }

    }

    manageControlBtn(event) {
        //  const customerId = $(e.target).closest('tr').find('th').eq(0).text();
        let colAr = event.currentTarget.children;
        for (let child of event.currentTarget.parentNode.children) {
            child.classList.remove("bg-primary");
        }
        event.currentTarget.classList.add("bg-primary");
        $("#customerBtnSection>:nth-child(1)").prop("disabled", true);
        $("#customerBtnSection>:nth-child(2)").prop("disabled", false);
        $("#customerBtnSection>:nth-child(3)").prop("disabled", false);

        $("#customerBtnSection>:nth-child(1)").removeClass("opacity-100");
        $("#customerBtnSection>:nth-child(2)").removeClass("opacity-25");
        $("#customerBtnSection>:nth-child(3)").removeClass("opacity-25");

        $("#customerBtnSection>:nth-child(1)").addClass("opacity-25");
        $("#customerBtnSection>:nth-child(2)").addClass("opacity-100");
        $("#customerBtnSection>:nth-child(3)").addClass("opacity-100");
        $("#customerID").val($(colAr[0]).text());
        $("#customerName").val($(colAr[1]).text());
        $("#customerAddress").val($(colAr[2]).text());
        $("#customerSalary").val($(colAr[3]).text());
    }

    loadAllCustomer(e) {
        $("#tblCustomerBody").html("");
        for (let customer of this.customerList2) {
            $("#tblCustomerBody").append(`<tr> <td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`);

            document.querySelector("#tblCustomerBody>:last-child").addEventListener("click", (evt)=>{
                this.manageControlBtn(evt);
            });

        }
        this.clearTextField();
    }

    btnNewCustomer() {
        $("#customerBtnSection>:nth-child(1)").prop("disabled", false);
        $("#customerBtnSection>:nth-child(2)").prop("disabled", true);
        $("#customerBtnSection>:nth-child(3)").prop("disabled", true);

        $("#customerBtnSection>:nth-child(1)").removeClass("opacity-25");
        $("#customerBtnSection>:nth-child(2)").removeClass("opacity-100");
        $("#customerBtnSection>:nth-child(3)").removeClass("opacity-100");

        $("#customerBtnSection>:nth-child(1)").addClass("opacity-100");
        $("#customerBtnSection>:nth-child(2)").addClass("opacity-25");
        $("#customerBtnSection>:nth-child(3)").addClass("opacity-25");
        this.clearTextField();
    }

    clearTextField() {
        $("#customerID").val("");
        $("#customerName").val("");
        $("#customerAddress").val("");
        $("#customerSalary").val("");
        $("#manageCustomer input").css("border-color","gray");
    }


}

let customerController = new CustomerController();







