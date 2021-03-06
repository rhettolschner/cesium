/*global defineSuite*/
defineSuite([
         'Core/PolylineGeometry',
         'Core/Cartesian3',
         'Core/PrimitiveType',
         'Core/VertexFormat',
         'Core/Color'
     ], function(
         PolylineGeometry,
         Cartesian3,
         PrimitiveType,
         VertexFormat,
         Color) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    it('constructor throws with no positions', function() {
        expect(function() {
            return new PolylineGeometry();
        }).toThrow();
    });

    it('constructor throws with less than two positions', function() {
        expect(function() {
            return new PolylineGeometry({
                positions : [Cartesian3.ZERO]
            });
        }).toThrow();
    });

    it('constructor throws with invalid width', function() {
        expect(function() {
            return new PolylineGeometry({
                positions : [Cartesian3.ZERO, Cartesian3.UNIT_X],
                width : -1
            });
        }).toThrow();
    });

    it('constructor throws with invalid number of colors', function() {
        expect(function() {
            return new PolylineGeometry({
                positions : [Cartesian3.ZERO, Cartesian3.UNIT_X, Cartesian3.UNIT_Y],
                colors : []
            });
        }).toThrow();
    });

    it('constructor computes all vertex attributes', function() {
        var positions = [new Cartesian3(), new Cartesian3(1.0, 0.0, 0.0), new Cartesian3(2.0, 0.0, 0.0)];
        var line = PolylineGeometry.createGeometry(new PolylineGeometry({
            positions : positions,
            width : 10.0,
            vertexFormat : VertexFormat.ALL
        }));

        expect(line.attributes.position).toBeDefined();
        expect(line.attributes.prevPosition).toBeDefined();
        expect(line.attributes.nextPosition).toBeDefined();
        expect(line.attributes.expandAndWidth).toBeDefined();
        expect(line.attributes.st).toBeDefined();

        var numVertices = (positions.length * 4 - 4);
        expect(line.attributes.position.values.length).toEqual(numVertices * 3);
        expect(line.attributes.prevPosition.values.length).toEqual(numVertices * 3);
        expect(line.attributes.nextPosition.values.length).toEqual(numVertices * 3);
        expect(line.attributes.expandAndWidth.values.length).toEqual(numVertices * 2);
        expect(line.attributes.st.values.length).toEqual(numVertices * 2);
        expect(line.indices.length).toEqual(positions.length * 6 - 6);
    });

    it('constructor computes per segment colors', function() {
        var positions = [new Cartesian3(), new Cartesian3(1.0, 0.0, 0.0), new Cartesian3(2.0, 0.0, 0.0)];
        var colors = [new Color(1.0, 0.0, 0.0, 1.0), new Color(0.0, 1.0, 0.0, 1.0), new Color(0.0, 0.0, 1.0, 1.0)];
        var line = PolylineGeometry.createGeometry(new PolylineGeometry({
            positions : positions,
            colors : colors,
            width : 10.0,
            vertexFormat : VertexFormat.ALL
        }));

        expect(line.attributes.color).toBeDefined();

        var numVertices = (positions.length * 4 - 4);
        expect(line.attributes.color.values.length).toEqual(numVertices * 4);
    });

    it('constructor computes per vertex colors', function() {
        var positions = [new Cartesian3(), new Cartesian3(1.0, 0.0, 0.0), new Cartesian3(2.0, 0.0, 0.0)];
        var colors = [new Color(1.0, 0.0, 0.0, 1.0), new Color(0.0, 1.0, 0.0, 1.0), new Color(0.0, 0.0, 1.0, 1.0)];
        var line = PolylineGeometry.createGeometry(new PolylineGeometry({
            positions : positions,
            colors : colors,
            colorsPerVertex : true,
            width : 10.0,
            vertexFormat : VertexFormat.ALL
        }));

        expect(line.attributes.color).toBeDefined();

        var numVertices = (positions.length * 4 - 4);
        expect(line.attributes.color.values.length).toEqual(numVertices * 4);
    });
});