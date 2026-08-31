import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-explore-container",
  standalone: true,
  templateUrl: "./explore-container.component.html",
  styleUrls: ["./explore-container.component.scss"],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name!: string;

  constructor() {}

  ngOnInit() {}
}
