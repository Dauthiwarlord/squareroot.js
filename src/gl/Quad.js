SQR.Quad = function() {

    this.size = 4;

    var that = this;

    var t1, t2, ag = arguments;

    if(arguments.length == 2) {
        t1 = ag[0];
        t2 = ag[1];
        this.vertices = [t1.a, t1.b, t1.c, t2.a, t2.b, t2.c];
        console.warn("Creating quads out of 2 triangles is deprecated! Pass 4 vertices instead");
    } else {
        t1 = new SQR.Triangle(ag[0], ag[1], ag[2]);
        t2 = new SQR.Triangle(ag[0], ag[2], ag[3]);
        this.vertices = [ag[0], ag[1], ag[2], ag[3]];
    }

    this.normal = t1.a.clone();

    var perVertex = false;

    this.calculateNormal = function(_perVertex) {
        perVertex = _perVertex;
        t1.calculateNormal(_perVertex);
        t2.calculateNormal(_perVertex);
        that.normal.add(t1.normal, t2.normal).norm();
    }

    this.toArray = function(vertexArray, normalArray, textureArray) {
        if(perVertex) {
            t1.toArray(vertexArray, normalArray, textureArray);
            t2.toArray(vertexArray, normalArray, textureArray);
        } else {
            t1.toArray(vertexArray, null, textureArray);
            t2.toArray(vertexArray, null, textureArray);

            if(normalArray) {
                var n = that.normal;
                var c = 6;
                while(c-- > 0) normalArray.push(n.x, n.y, n.z);
            }
        }
    }
}