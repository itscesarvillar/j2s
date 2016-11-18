describe('test',function(){

  it('test true', function() {
    expect(true).to.be.true;
  });

  it('should fetch something from the net', function() {
    var callback = sinon.spy();
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];
    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };

    app.network.get('/path/to/someting', callback);

    requests[0].respond(200, { "Content-Type": "text" }, 'yeah');

    expect(requests.length).to.be.equal(1);
    expect(callback).to.be.called.once;
    expect(callback).to.be.calledWith('yeah');

    this.xhr.restore();
  });
});
