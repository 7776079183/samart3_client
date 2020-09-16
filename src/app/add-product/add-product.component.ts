import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  submitted = false;
  fileObject:any;
  sizes:any[];
  categories:any[];
  constructor(private formBuilder: FormBuilder, private smartService : VivideaServicesService,private route: Router,) { }

  ngOnInit(): void {
    this.generateProductForm();
    this.getSizes();
    this.getCategories();
  }

  generateProductForm(){
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  get f() { return this.addProductForm.controls; }

  addProduct(){
    this.submitted = true;
    console.log(this.addProductForm.value.image)
    // stop here if form is invalid
    if (this.addProductForm.invalid) {
        return;
    }
    
    this.smartService.addProduct(this.addProductForm.value).subscribe((result:any)=>{
      alert("Product Added Successfully");
      this.route.navigate(['/admin']);
    },(error)=>{
      console.log(error)
       alert("Duplicate sku_id");
    })
  }

  getSizes(){
    this.smartService.getSizes().subscribe((result:any)=>{
      this.sizes = result.data;
      console.log(this.sizes)
    },(error)=>{
      console.log(error);
    })
  }

  getCategories(){
    this.smartService.getCategories().subscribe((result:any)=>{
      this.categories = result.data;
      console.log(this.categories)
    },(error)=>{
      console.log(error);
    })
  }

}
