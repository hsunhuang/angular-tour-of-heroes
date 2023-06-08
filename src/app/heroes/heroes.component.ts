import { Component,OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  // heroes = HEROES;
  selectedHero?:Hero;
  heroes: Hero[] = [];

  hero: Hero = {
    id: 1,
    name: 'Windstorm'};

constructor(private heroService: HeroService, private messageService: MessageService){}
ngOnInit(): void {this.getHeroes();}


// 新增onSelect()方法，它會把範本中被點選的英雄賦值給元件的 selectedHero 屬性。
onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
}
//新增getHeroes()方法從服務中獲取這些英雄資料
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes=>this.heroes=heroes);
}
//新增英雄
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}
delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}
}

