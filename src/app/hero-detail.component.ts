import { Component, Input, OnInit  } from '@angular/core';

import { Hero } from './hero';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { HeroService } from './hero-service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'my-hero-detail',
  templateUrl: './app/html/hero-details.component.html',
  styleUrls: [ './app/css/hero-detail.component.css' ]

})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
        ) {}

  goBack(): void {
          this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
    .then(() => this.goBack());
  }
}
