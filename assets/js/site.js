/**
 * Menu
 */
$("a.menu-icon").on("click", function(event) {
  var w = $(".menu");

  w.css({
    display: (w.css("display") === "none")
      ? "block"
      : "none"
  });
});

/**
 * Footer year
 */
$(document).ready(function() {
  $("#year").text(new Date().getFullYear());
});

/**
 * Footer email
 */
$(document).ready(function() {
  $(".email-link-cloaked").on("click", function(event) {
    const _link = event.target;

    const _user = reverseString(_link.getAttribute("data-resu"));
    const _domain = reverseString(_link.getAttribute("data-eman-niamod"));
    const _tld = reverseString(_link.getAttribute("data-dlt-niamod"));

    window.location.href = `mailto:${_user}@${_domain}.${_tld}`;
  });
});

/**
 * Reverses a string
 */
function reverseString(str) {
  return str.split("").reverse().join("");
}

/**
 * Moves WeChat widget
 */
function moveWidget(event) {
  var w = $("#wechat-widget");

  w.css({
    left: event.pageX - 25,
    top: event.pageY - w.height() - 60
  });
}

$("a#wechat-link").on("mouseenter", function(event) {
  $("#wechat-widget").css({ display: "block" });

  moveWidget(event);
});

$("a#wechat-link").on("mousemove", function(event) {
  moveWidget(event);
});

$("a#wechat-link").on("mouseleave", function(event) {
  $("#wechat-widget").css({ display: "none" });
});

/**
 * Language toggle for Short Bio
 */
$(document).ready(function () {
  const bioContainer = $("#short-bio-content");
  const btnKorean = $("#btn-korean");
  const btnEnglish = $("#btn-english");

  // Markdown 파일 경로
  const bioMarkdownPath = "/assets/data/bio.md";

  // Markdown 데이터를 저장할 변수
  let bioData = {
    korean: "",
    english: ""
  };

  // Markdown 파일 로드 및 파싱
  fetch(bioMarkdownPath)
    .then((response) => response.text())
    .then((data) => {
      // Markdown 파싱
      const sections = data.split("<!--");
      bioData.korean = sections[1].split("-->")[1].trim();
      bioData.english = sections[2].split("-->")[1].trim();

      // 기본값: Korean
      renderMarkdown(bioData.korean);
    })
    .catch((error) => {
      console.error("Error loading bio Markdown:", error);
    });

  // 버튼 클릭 이벤트
  btnKorean.on("click", function () {
    console.log("Korean button clicked");
    renderMarkdown(bioData.korean);
    btnKorean.addClass("active");
    btnEnglish.removeClass("active");
  });

  btnEnglish.on("click", function () {
    console.log("English button clicked");
    renderMarkdown(bioData.english);
    btnEnglish.addClass("active");
    btnKorean.removeClass("active");
  });

  // Markdown 렌더링 함수
  function renderMarkdown(markdown) {
    const converter = new showdown.Converter({ simpleLineBreaks: true });
    const html = converter.makeHtml(markdown);
    bioContainer.html(html);
  }
});
