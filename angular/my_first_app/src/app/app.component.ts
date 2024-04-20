import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'my_first_app';
  ngOnInit(): void {
    this.applyThemeFromStorage();
  }

  settingsMenuToggle(): void {
    const settingsmenu = document.querySelector(".settings-menu") as HTMLElement;
    settingsmenu.classList.toggle("settings-menu-height");
  }

  private applyThemeFromStorage(): void {
    const darkBtn = document.getElementById("dark-btn") as HTMLDivElement;
    const currentTheme = localStorage.getItem("theme") || "light";

    darkBtn.addEventListener('click', () => {
      darkBtn.classList.toggle("dark-btn-on");
      document.body.classList.toggle("dark-theme");

      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });

    if (currentTheme === "light") {
      darkBtn.classList.remove("dark-btn-on");
      document.body.classList.remove("dark-theme");
    } else if (currentTheme === "dark") {
      darkBtn.classList.add("dark-btn-on");
      document.body.classList.add("dark-theme");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
}