import icons from 'url:../../img/icons.svg';

class searchView {
  #parentEl = document.querySelector('.search');
  #data;
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clear();
    return query;
  }
  #clear() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  render(data) {
    console.log(data);
  }
  #generateMarkup() {
    return `    <li class="preview">
                    <a class="preview__link" href="#23456">
                      <figure class="preview__fig">
                        <img src="src/img/test-1.jpg" alt="Test" />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          Pasta with Tomato Cream ...
                        </h4>
                        <p class="preview__publisher">The Pioneer Woman</p>
                      </div>
                    </a>
                </li>`;
  }
}
export default new searchView();
