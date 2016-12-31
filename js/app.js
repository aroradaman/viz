$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(200);

  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;
  var barPadding = '1';

  function createSvg(parent, height, width) {
	return d3.select(parent).append('svg').attr('height', height).attr('width', width).attr('id', 'yo');
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
	 .data(frequencyData)
	 .enter()
	 .append('rect')
	 .attr('x', function (d, i) {
		return i * (svgWidth / (frequencyData.length));
	 })
	 .attr('width', svgWidth / frequencyData.length);



  // Continuously loop and update chart with frequency data.
  function renderChart() {
	 requestAnimationFrame(renderChart);

	 // Copy frequency data to frequencyData array.
	 analyser.getByteFrequencyData(frequencyData);
	 $('#fdata').val(JSON.stringify(frequencyData));
	 // Update d3 chart with new data.

  }
  renderChart();
});
