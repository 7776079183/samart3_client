import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;
  submitted = false;
  fileObject:any;
  product:any;
  sizes:any[];
  categories:any[];
  constructor(private formBuilder: FormBuilder, private smartService : VivideaServicesService,private route: Router,private activatedRoute :  ActivatedRoute) { }

  ngOnInit(): void {
    this.getSizes();
    this.getCategories();
    this. getProductDetails();
    this.generateProductForm();
  }

  generateProductForm(){
    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  get f() { return this.updateProductForm.controls; }

  getProductDetails(){
   this.smartService.productDetail(this.activatedRoute.snapshot.params['_id']).subscribe((result:any)=>{
      this.product = result[0];
      this.updateProductForm.setValue({
        name: this.product.name,
        category:this.product.category._id,
        price: this.product.price,
        size: this.product.size._id,
        stock: this.product.stock,
        description: this.product.description
      });
      this.updateProductForm.value._id = this.activatedRoute.snapshot.params['_id'];
  },(error)=>{
    console.log(error)
  })
  }
  
  udateProduct(){
    this.submitted = true;
    console.log(this.updateProductForm.value.image)
    // stop here if form is invalid
    if (this.updateProductForm.invalid) {
        return;
    }
  
    this.smartService.updateProduct( this.updateProductForm.value).subscribe((result:any)=>{
      alert("Product Updated Successfully");
      this.route.navigate(['/admin']);
    },(error)=>{
        console.log(error);
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
